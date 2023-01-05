import React, {useEffect, useImperativeHandle} from 'react';
import {CustomOverlay, NavigationControl} from 'react-bmapgl';
import {Space} from 'antd';
import MarkItem from '@/components/Amap/components/MarkItem';
import styles from '@/components/Amap/index.module.less';

const Map = ({
  map,
  onBounds = () => {
  },
  onMarkerClick = () => {
  },
  loading,
  positions = [],
  mapNum = {},
}, ref) => {


  const getBounds = () => {
    // 西南，东北
    const {sw, ne} = map.getBounds();
    // 西北 经度 纬度
    const northwest = {lng: sw.lng, lat: ne.lat};
    // 东南 经度 纬度
    const southeast = {lng: ne.lng, lat: sw.lat};
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
    getBounds
  }));

  useEffect(() => {
    // getBounds();
  }, []);

  return <div>
    <div className={styles.deviceCount}>
      <Space size={24}>
        <div>
          设备数量：{mapNum.total || 0}
        </div>
        <div className={styles.textOnline}>
          在线：{mapNum.onNum || 0}
        </div>
        <div className={styles.textOffline}>
          离线：{mapNum.offNum || 0}
        </div>
        <div className={styles.textErrorline}>
          报警：{mapNum.alarmNum || 0}
        </div>
      </Space>
    </div>
    {
      !loading && positions.map((item, index) => {
        const position = item.position || {};
        /* eslint-disable-next-line no-undef */
        return <CustomOverlay key={index} position={new BMapGL.Point(position.lng, position.lat)}>
          <MarkItem device={item.device} id={item.device?.deviceId} onMarkerClick={onMarkerClick}/>
        </CustomOverlay>;
      })
    }

    <NavigationControl/>
  </div>;
};

export default React.forwardRef(Map);
