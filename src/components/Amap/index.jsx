import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Map, Markers} from 'react-amap';
import {Spin} from 'antd';
import AmapSearch from '@/components/Amap/search';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';

export const deviceList = {url: '/electronicMap/list', method: 'POST'};

const Amap = (props, ref) => {

  const [params, setParams] = useState({});

  const [positions, setPositions] = useState([]);

  const [center, setCenter] = useState();

  const {loading: devicesLoading, run: getDeviceList} = useRequest(deviceList, {
    manual: true,
    onSuccess: (res) => {
      const list = [];
      isArray(res).forEach(item => {
        if (item.latitude && item.longitude) {
          list.push({
            position: {
              latitude: item.latitude,
              longitude: item.longitude
            }
          });
        }
      });
      setPositions(list);
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

  const submit = async (newParams = {}) => {
    const data = {...params, ...newParams,};
    setParams(data);
    const res = await getDeviceList({data});

    if (isArray(res).length > 0 && res[0].latitude && res[0].longitude) {
      setCenter({
        latitude: res[0].latitude,
        longitude: res[0].longitude
      });
    }
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  useEffect(() => {
    if (center) {
      mapRef.current.setCenter(true);
    }
  }, [center]);

  return <Spin spinning={devicesLoading} tip="正在查询设备，请稍后...">
    <div style={{height: '100vh'}}>
      <Map events={events} center={center} zoom={16}>
        <Markers
          markers={positions}
        />
        <AmapSearch
          ref={mapRef}
          onCenter={(position) => {
            // setPositions(markers(bounds.center));
            setCenter(position);
          }}
          onBounds={(bounds = {}) => {
            const locationParams = [
              bounds.northwest,
              bounds.southeast
            ];
            getDeviceList({data: {locationParams}});
          }}
        />
      </Map>
    </div>
  </Spin>;
};
export default React.forwardRef(Amap);
