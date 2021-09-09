import React, {useEffect, useState} from 'react';
import {Map, MouseTool} from 'react-amap';
import Geolocation from 'react-amap-plugin-geolocation';
import {Button} from 'antd';

const layerStyle = {
  padding: '10px',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  position: 'absolute',
  top: '10px',
  left: '10px'
};

const ReactMap = (props) => {

  const {location} = props;


  const [state, setState] = useState({
    what: '点击下方按钮开始绘制'
  });
  const mapPlugins = ['Scale', 'OverView', 'ControlBar',];


  const [mapCenter, setMapCenter] = useState();

  const [tool, setTool] = useState();

  const toolEvents = {
    created: (tool) => {
      setTool(tool);
    },
    draw({obj}) {
      drawWhat(obj);
    }
  };

  // useEffect(()=>{
  //   const map = new Map();
  //   console.log(map);
  // },[]);

  const drawWhat = (obj) => {
    let text = '';
    switch (obj.CLASS_NAME) {
      case 'AMap.Marker':
        setMapCenter({longitude: obj.getPosition().lng, latitude: obj.getPosition().lat});
        location(obj.getPosition());
        text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
        break;
      default:
        text = '';
    }
    setState({
      what: text
    });
  };


  const drawMarker = () => {
    if (tool) {
      tool.marker();
      setState({
        what: '准备绘制坐标点'
      });
    }
  };

  const pluginProps = {
    enableHighAccuracy: true,
    timeout: 10000,
    showButton: true,
    convert: false,
    buttonPosition: 'RB'
  };


  const MyReactMap = ({__map__: AMap}) => {
    // const AMap = props.__map__;
    // console.log(AMap);
    // AMap.plugin('AMap.CitySearch', function () {
    //   const citySearch = new AMap.CitySearch();
    //   citySearch.getLocalCity(function (status, result) {
    //     if (status === 'complete' && result.info === 'OK') {
    //       // 查询成功，result即为当前所在城市信息
    //       console.log(result);
    //     }
    //   });
    // });
    // const citySearch = new props.__map__.CitySearch();
    // console.log(citySearch);
    // citySearch.getLocalCity(function (status, result) {
    //   if (status === 'complete' && result.info === 'OK') {
    //     console.log(result);
    //     // 查询成功，result即为当前所在城市信息
    //   }
    // });
    return null;
  };


  return <div>
    <div style={{width: '100%', height: 370}}>
      <Map
        plugins={mapPlugins} center={mapCenter}
      >
        <MyReactMap />
        <Geolocation {...pluginProps} />
        <MouseTool events={toolEvents} />
        <div style={layerStyle}>{state.what}</div>
      </Map>
    </div>
    <Button onClick={() => {
      drawMarker();
    }}>点击标记位置
    </Button>
  </div>;
};
export default ReactMap;

