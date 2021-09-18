import React, {useState, useImperativeHandle, useEffect} from 'react';
import {Marker} from 'react-amap';
import {useRequest} from '@/util/Request';
import {Button, Card, Cascader as AntCascader, Input, List, Select} from 'antd';
import Icon from '@/components/Icon';

let MSearch = null;
let Geocoder = null;

const AmapSearch = ({__ele__, __map__, onChange, center}, ref) => {


  const [citys, setCitys] = useState();

  const [city, setCity] = useState();


  const {run} = useRequest({url: '/commonArea/treeView', method: 'POST'}, {manual: true});
  const {run: runCisy} = useRequest({url: '/commonArea/list', method: 'POST'}, {manual: true});


  // console.log(window.AMap);
  window.AMap.plugin(['AMap.PlaceSearch'], function () {
    const PlaceSearchOptions = { // 设置PlaceSearch属性
      city: city && city.city, // 城市
      type: '', // 数据类别
      pageSize: 10, // 每页结果数,默认10
      pageIndex: 1, // 请求页码，默认1
      extensions: 'all' // 返回信息详略，默认为base（基本信息）
    };
    MSearch = new window.AMap.PlaceSearch(PlaceSearchOptions); // 构造PlaceSearch类
    window.AMap.Event.addListener(MSearch, 'complete', (result) => {
      setResult(result.poiList);
    }); // 返回结果
  });
  window.AMap.plugin(['AMap.Geocoder'], function () {
    Geocoder = new window.AMap.Geocoder({
      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      city: ''
    });
  });

  // const MSearch = new __map__.PlaceSearch();
  // console.log(MSearch);
  const [value, setValue] = useState('');
  const [adinfo, setadinfo] = useState({});
  const [reslut, setResult] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const onClick = () => {
    MSearch.search(value); // 关键字查询
  };


  const setData = (value) => {
    setMarkerPosition(value.location);
    __map__.setCenter(value.location);
  };

  useImperativeHandle(ref, () => ({
    setCenter: (is) => {
      const value = __map__.getCenter();
      setMarkerPosition(value);
      if (is) {
        const lnglat = [value.lng, value.lat];
        Geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            const m = {address: result.regeocode.formattedAddress, name: '', location: [value.lng, value.lat]};
            setadinfo(m);
          }
        });
      }
    }
  }));

  useEffect(() => {
    window.AMap.plugin('AMap.CitySearch', function () {
      const citySearch = new window.AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {

          Geocoder.getLocation(result.city, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              setadinfo({
                address: result.geocodes[0].formattedAddress,
                location: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
              });
              center(
                {
                  lat: result.geocodes[0].location.lat,
                  lgn: result.geocodes[0].location.lng
                }
              );
              setMarkerPosition({
                lat: result.geocodes[0].location.lat,
                lng: result.geocodes[0].location.lng
              });
              // result中对应详细地理坐标信息
            }
          });
          // 查询成功，result即为当前所在城市信息
          setCity(result);
          // center({lgn:result.rectangle.split(';')[0].split(',')[0],lat:result.rectangle.split(';')[0].split(',')[1]});
          // setMarkerPosition({
          //   lat: result.rectangle.split(';')[0].split(',')[1],
          //   lng: result.rectangle.split(';')[0].split(',')[0]
          // });
        }
      });
    });
    // const value = __map__.getCenter();
    // setMarkerPosition(value);
    run({}).then((res) => {
      setCitys(res);
    });

  }, []);


  return (
    <div style={{position: 'absolute', top: 0, padding: 10, width: '100%'}}>
      <div>
        <Input
          onChange={(value) => {
            setValue(value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              MSearch.search(value); // 关键字查询
            }
          }}
          style={{width: 500,marginRight:20}}
          innerBefore={
            <span
              style={{paddingLeft: 10}}
            >{city &&
            <AntCascader
              changeOnSelect
              style={{minWidth:250,marginRight:10}}
              showSearch={(inputValue, path)=>{
                path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
              }}
              options={citys}
              defaultValue={[city.city]}
              onChange={async (value) => {
                let cityId = null;
                value.length > 0 && value.map((items, index) => {
                  return cityId = items;
                });
                const city = await runCisy({
                  data: {
                    id: cityId
                  }
                });
                Geocoder.getLocation(city.length > 0 && city[0].title, function (status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    setadinfo({
                      address: result.geocodes[0].formattedAddress,
                      location: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
                    });
                    center(
                      {
                        lat: result.geocodes[0].location.lat,
                        lgn: result.geocodes[0].location.lng
                      }
                    );
                    setMarkerPosition({
                      lat: result.geocodes[0].location.lat,
                      lng: result.geocodes[0].location.lng
                    });
                    // result中对应详细地理坐标信息
                  }
                });
              }} />}
              :</span>
          }
          innerAfter={<Icon type="search" size="xs" onClick={onClick} style={{margin: 4}} />} />
        <Button
          // style={{float: 'left'}}
          type="primary"
          onClick={() => {
            typeof onChange === 'function' && onChange(adinfo);
          }}>确定</Button>
      </div>
      {reslut && reslut.count > 0 && <Card style={{maxHeight: 500, width: '40%', overflowY: 'auto', marginTop: 16}}>
        <List>
          {reslut.pois.map((item, index) => {
            return (<List.Item key={index} title={item.name} onClick={() => {
              setData(item);
            }} extra={<Button type="primary" onClick={() => {
              const location = {
                address: item.pname + item.cityname + item.address + name,
                location: [item.location.lng, item.location.lat],
              };
              typeof onChange === 'function' && onChange(location);
            }}>使用该地址</Button>}>{item.address}</List.Item>);
          })}
        </List>
      </Card>}
      {markerPosition && <Marker position={markerPosition} __map__={__map__} />}
    </div>
  );

};

export default React.forwardRef(AmapSearch);
