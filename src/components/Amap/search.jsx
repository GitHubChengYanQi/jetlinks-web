import React, {useState, useImperativeHandle, useEffect} from 'react';
import {Marker, Markers} from 'react-amap';
import {Button, Card, Cascader as AntCascader, Input, List, Popover, Space} from 'antd';
import {useRequest} from '@/util/Request';
import store from '@/store';

let MSearch = null;
let Geocoder = null;

const AmapSearch = (
  {
    value: defaultValue = [],
    __map__,
    onChange = () => {
    },
    center,
    onBounds = () => {

    },
    positions = [],
    show,
  }, ref) => {

  const [data] = store.useModel('dataSource');

  const [city, setCity] = useState();

  const [visiable, setVisiable] = useState();

  const [adinfo, setadinfo] = useState({
    location: defaultValue.length > 0 ? [
      defaultValue[0],
      defaultValue[1],
    ] : [],
  });
  const [reslut, setResult] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(defaultValue.length > 0 ? {
    lng: defaultValue[0],
    lat: defaultValue[1],
  } : null);


  const {run: runCisy} = useRequest({url: '/commonArea/area', method: 'GET'}, {manual: true});


  // console.log(window.AMap);
  window.AMap.plugin(['AMap.PlaceSearch'], function () {
    const PlaceSearchOptions = { // 设置PlaceSearch属性
      city, // 城市
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
      city: '',
    });
  });


  const setData = (value) => {
    setMarkerPosition(value.location);
    __map__.setCenter(value.location);
  };

  const getBounds = () => {
    // 西北
    const northwest = __map__.getBounds().getNorthWest();
    // 东南
    const southeast = __map__.getBounds().getSouthEast();
    onBounds({
      northwest: {
        latitude: northwest.lat,
        longitude: northwest.lng
      },
      southeast: {
        latitude: southeast.lat,
        longitude: southeast.lng
      },
    });
  };

  useImperativeHandle(ref, () => ({
    setCenter: (is) => {

      if (show) {
        getBounds();
        return;
      }
      const value = __map__.getCenter();
      setMarkerPosition(value);
      if (is) {
        const lnglat = [value.lng, value.lat];
        Geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            const m = {
              address: result.regeocode.formattedAddress,
              name: '',
              location: [value.lng, value.lat],
              city: result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
            };
            setadinfo(m);
          }
        });
      }
    }
  }));


  useEffect(() => {
    if (defaultValue.length > 0) {
      return;
    }
    window.AMap.plugin('AMap.CitySearch', function () {
      const citySearch = new window.AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          Geocoder.getLocation(result.city, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              center(
                {
                  lat: result.geocodes[0].location.lat,
                  lng: result.geocodes[0].location.lng
                }
              );
              if (show) {
                return;
              }
              setadinfo({
                address: result.geocodes[0].formattedAddress,
                location: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
                city: result.geocodes[0].addressComponent.city || result.geocodes[0].addressComponent.province
              });
              setMarkerPosition({
                lat: result.geocodes[0].location.lat,
                lng: result.geocodes[0].location.lng
              });
              // result中对应详细地理坐标信息
            }
          });
          // 查询成功，result即为当前所在城市信息
          setCity(result.city);
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


  if (show) {
    return <Markers
      markers={positions}
      __map__={__map__}
    />;
  }

  return (
    <div
      style={{position: 'absolute', top: 0, padding: 10, width: '100%'}}
    >
      <span style={{paddingLeft: 10}}>
        <AntCascader
          changeOnSelect
          style={{minWidth: 250, marginRight: 10}}
          showSearch={(inputValue, path) => {
            path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
          }}
          placeholder="请选择省市区进行搜索"
          options={children(data && data.area)}
          defaultValue={city ? [city] : []}
          onChange={async (value) => {
            const currentCity = await runCisy({
              params: {
                positionId: value[value.length - 1]
              }
            });
            setCity(currentCity);
            Geocoder.getLocation(currentCity, function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                setadinfo({
                  address: result.geocodes[0].formattedAddress,
                  location: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
                  city: result.geocodes[0].addressComponent.city || result.geocodes[0].addressComponent.province
                });
                center(
                  {
                    lat: result.geocodes[0].location.lat,
                    lng: result.geocodes[0].location.lng
                  }
                );
                setMarkerPosition({
                  lat: result.geocodes[0].location.lat,
                  lng: result.geocodes[0].location.lng
                });
                // result中对应详细地理坐标信息
              }
            });
          }}/>
      </span>
      <Popover onOpenChange={(visible) => {
        setVisiable(visible);
      }} placement="bottom" content={reslut && reslut.count > 0 &&
        <Card style={{maxHeight: '50vh', minWidth: 500, overflowY: 'auto', marginTop: 16}}>
          <List>
            {reslut.pois.map((item, index) => {
              return (<List.Item key={index} style={{cursor: 'pointer'}} onClick={() => {
                const m = {
                  address: item.address,
                  location: [item.location.lng, item.location.lat],
                  city: item.cityname
                };
                setadinfo(m);
                setData(item);
              }} extra={<Button type="primary" onClick={() => {
                const location = {
                  address: item.pname + item.cityname + item.address,
                  location: [item.location.lng, item.location.lat],
                  city: item.cityname || item.pname
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
            setVisiable(true);
          }}
          onSearch={(e) => {
            MSearch.search(e);
            if (reslut && reslut.pois && reslut.pois.length > 0) {
              const m = {
                address: reslut.pois[0].address,
                location: [reslut.pois[0].location.lng, reslut.pois[0].location.lat],
                city: reslut.pois[0].cityname
              };
              setadinfo(m);
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
      {markerPosition && <Marker position={markerPosition} __map__={__map__}/>}
    </div>
  );

};

export default React.forwardRef(AmapSearch);
