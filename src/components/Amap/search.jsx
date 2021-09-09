import React, {useState, useImperativeHandle, useEffect} from 'react';
import {Input, Icon, List, Card, Button} from '@alifd/next';
import {Marker} from 'react-amap';

let MSearch = null;
let Geocoder = null;
const AmapSearch = ({__ele__, __map__, onChange}, ref) => {

  // console.log(window.AMap);
  window.AMap.plugin(['AMap.PlaceSearch'], function () {
    const PlaceSearchOptions = { // 设置PlaceSearch属性
      city: "沈阳", // 城市
      type: "", // 数据类别
      pageSize: 10, // 每页结果数,默认10
      pageIndex: 1, // 请求页码，默认1
      extensions: "all" // 返回信息详略，默认为base（基本信息）
    };
    MSearch = new window.AMap.PlaceSearch(PlaceSearchOptions); // 构造PlaceSearch类
    window.AMap.Event.addListener(MSearch, "complete", (result) => {
      console.log(result.poiList);
      setResult(result.poiList);
    }); // 返回结果
  });
  window.AMap.plugin(['AMap.Geocoder'], function () {
    Geocoder = new window.AMap.Geocoder({
      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      city: ''
    });
  });

  window.AMap.plugin('AMap.CitySearch', function () {
    const citySearch = new window.AMap.CitySearch();
    citySearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        console.log(result);
      }
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
      if(is){
        const lnglat = [value.lng,value.lat];
        Geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            const m= {address:result.regeocode.formattedAddress,name: '', location: [value.lng,value.lat]};
            setadinfo(m);
          }
        });
      }
    }
  }));
  useEffect(() => {
    const value = __map__.getCenter();
    setMarkerPosition(value);
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
          style={{width: 360}}
          innerBefore={<span style={{paddingLeft: 10}}>沈阳市:</span>}
          innerAfter={<Icon type="search" size="xs" onClick={onClick} style={{margin: 4}}/>}/>
        <Button
          style={{float: 'right'}}
          onClick={() => {
            typeof onChange === "function" && onChange(adinfo);
          }}>确定</Button>
      </div>
      {reslut && reslut.count > 0 && <Card style={{maxHeight: 500,width:'30%', overflowY: 'auto', marginTop: 16}}>
        <List>
          {reslut.pois.map((item, index) => {
            return (<List.Item key={index} title={item.name} onClick={() => {
              setData(item);
            }} extra={<Button type="primary" onClick={() => {
              console.log(item);
              typeof onChange === "function" && onChange(item);
            }}>使用该地址</Button>}>{item.address}</List.Item>);
          })}
        </List>
      </Card>}
      {markerPosition && <Marker position={markerPosition} __map__={__map__}/>}
    </div>
  );

};

export default React.forwardRef(AmapSearch);
