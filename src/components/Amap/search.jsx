import React, {useState, useImperativeHandle, useEffect} from 'react';
import {Marker} from 'react-amap';
import {Button, Card, Cascader as AntCascader, Input, List, Popover, Space} from 'antd';
import {useRequest} from '@/util/Request';
import store from '@/store';

let MSearch = null;
let Geocoder = null;

const AmapSearch = ({
  value: defaultValue,
  __map__,
  onChange = () => {
  },
  center
}, ref) => {

  const [data] = store.useModel('dataSource');

  const [city, setCity] = useState();

  const [visiable, setVisiable] = useState();

  const [value, setValue] = useState('');
  const [adinfo, setadinfo] = useState({});
  const [reslut, setResult] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);


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
      city: '',
    });
  });


  const setData = (location) => {
    setMarkerPosition(location);
    __map__.setCenter(location);
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
            setadinfo({
              lat: value.lat,
              lgn:value.lng
            });
          }
        });
      }
    }
  }));


  useEffect(() => {
    if (defaultValue) {
      return;
    }
    window.AMap.plugin('AMap.CitySearch', function () {
      const citySearch = new window.AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          Geocoder.getLocation(result.city, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              const location = {
                lat: result.geocodes[0].location.lat,
                lgn: result.geocodes[0].location.lng
              };
              setadinfo(location);
              center(location);
              setMarkerPosition(location);
              // result中对应详细地理坐标信息
            }
          });
          // 查询成功，result即为当前所在城市信息
          setCity(result);
        }
      });
    });
  }, []);

  const children = (data) => {
    if (!Array.isArray(data))
      return [];
    return data.map((item) => {
      return {
        value: item.value,
        label: item.label,
        children: children(item.children),
      };
    });
  };


  return (
    <div
      style={{position: 'absolute', top: 0, padding: 10, width: '100%'}}
    >
      <span style={{paddingLeft: 10}}>{city &&
      <AntCascader
        changeOnSelect
        style={{minWidth: 250, marginRight: 10}}
        showSearch={(inputValue, path) => {
          path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
        }}
        options={children(data && data.area)}
        defaultValue={[city.city]}
        onChange={async (value, options) => {
          let cityId = null;
          value.length > 0 && value.map((items, index) => {
            return cityId = items;
          });
          const city = await runCisy({
            data: {
              id: cityId
            }
          });
          setCity({
            city: options && options[options.length - 1] && options[options.length - 1].label
          });
          Geocoder.getLocation(city.length > 0 && city[0].title, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              const location = {
                lat: result.geocodes[0].location.lat,
                lgn: result.geocodes[0].location.lng
              };
              setadinfo(location);
              center(location);
              setMarkerPosition(location);
            }
          });
        }} />}</span>
      <Popover onOpenChange={(visible) => {
        setVisiable(visible);
      }} placement="bottom" content={reslut && reslut.count > 0 &&
      <Card style={{maxHeight: '50vh', minWidth: 500, overflowY: 'auto', marginTop: 16}}>
        <List>
          {reslut.pois.map((item, index) => {
            return (<List.Item key={index} style={{cursor: 'pointer'}} onClick={() => {
              const location = {
                lat: item.location.lat,
                lgn: item.location.lng
              };
              setadinfo(location);
              setData(item);
            }} extra={<Button type="primary" onClick={() => {
              const location = {
                lat: item.location.lat,
                lgn: item.location.lng
              };
              onChange(location);
              setVisiable(false);
            }}>使用该地址</Button>}>
              <Space direction="vertical">
                <div>
                  {item.name}
                </div>
                <div>
                  {item.address}
                </div>
                <div>
                  {item.type}
                </div>
              </Space>
            </List.Item>);
          })}
        </List>
      </Card>} open={visiable}>
        <Input.Search
          placeholder="搜索地点"
          onChange={(value) => {
            MSearch.search(value.target.value);
            setValue(value.target.value);
            setVisiable(true);
          }}
          onSearch={(e) => {
            MSearch.search(e);
            if (reslut && reslut.pois && reslut.pois.length > 0) {
              const location = {
                lat: reslut.pois[0].location.lat,
                lgn: reslut.pois[0].location.lng
              };
              setadinfo(location);
              setData(reslut.pois[0]);
            }
          }}
          style={{width: 'auto', marginRight: 20}}
        />
      </Popover>
      <Button
        type="primary"
        onClick={() => {
          onChange(adinfo);
        }}>确定</Button>
      {markerPosition && <Marker position={markerPosition} __map__={__map__} />}
    </div>
  );

};

export default React.forwardRef(AmapSearch);
