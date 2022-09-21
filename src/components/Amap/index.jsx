import React, {useRef, useState} from 'react';
import {Map, Markers} from 'react-amap';
import {Spin} from 'antd';
import AmapSearch from '@/components/Amap/search';
import {useRequest} from '@/util/Request';

export const deviceList = {url: '/electronicMap/list', method: 'POST'};

const Amap = () => {

  const {loading: devicesLoading, run: getDeviceList} = useRequest(deviceList, {
    manual: true,
    onSuccess: (res) => {
      // console.log(res);
    }
  });

  const markers = ({longitude = 0, latitude = 0}) => {
    return Array(200).fill(true).map((e, idx) => {
      if (idx > 100) {
        return {
          position: {
            longitude: longitude + Math.random() * 0.02,
            latitude: latitude + Math.random() * 0.02
          }
        };
      } else {
        return {
          position: {
            longitude: longitude - Math.random() * 0.02,
            latitude: latitude - Math.random() * 0.02
          }
        };
      }
    });
  };

  const mapRef = useRef(null);

  const events = {
    dragend: () => {
      mapRef.current.setCenter(true);
    },
    dragging: (v) => {
      mapRef.current.setCenter(false);
    }
  };

  const [center, setCenter] = useState({});

  const [positions, setPositions] = useState([]);

  return <Spin spinning={devicesLoading} tip="正在查询设备，请稍后...">
    <div style={{height:'100vh'}}>
      <Map events={events} center={center} zoom={16}>
        <Markers
          markers={positions}
        />
        <AmapSearch
          ref={mapRef}
          onBounds={(bounds = {}) => {
            const locationParams = [
              bounds.northwest,
              bounds.southeast
            ];
            getDeviceList({data:{locationParams}});
            setPositions(markers(bounds.center));
            setCenter(bounds.center);
          }}
        />
      </Map>
    </div>
  </Spin>;
};
export default Amap;
