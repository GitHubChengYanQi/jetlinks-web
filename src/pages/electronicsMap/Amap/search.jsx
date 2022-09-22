import React, {useEffect, useImperativeHandle} from 'react';

let Geocoder = null;

const AmapSearch = ({
  __map__,
  onBounds = () => {

  },
  onCenter = () => {

  },
}, ref) => {

  window.AMap.plugin(['AMap.Geocoder'], function () {
    Geocoder = new window.AMap.Geocoder({
      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      city: '',
    });
  });

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
      if (is) {
        getBounds();
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
              onCenter({
                latitude: result.geocodes[0].location.lat,
                longitude: result.geocodes[0].location.lng
              });
            }
          });
        }
      });
    });
  }, []);

  return <></>;

};

export default React.forwardRef(AmapSearch);
