import React, {useEffect} from 'react';

const Test = () => {

  useEffect(() => {
    const map = new window.BMap.Map('container');
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 6);
    map.addControl(new window.BMap.MapTypeControl({
      mapTypes: [
        window.BMAP_NORMAL_MAP,
        window.BMAP_HYBRID_MAP
      ]
    }));
    map.setCurrentCity('沈阳');
    map.enableScrollWheelZoom(true);
    map.addEventListener('click', function (e) {
      alert(e.point.lng + ',' + e.point.lat);
    });
  }, []);

  return <>
    <div id="container"></div>
  </>;
};
export default Test;
