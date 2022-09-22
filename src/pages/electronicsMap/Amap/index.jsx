import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Map} from 'react-amap';
import {Spin} from 'antd';
import {config} from 'ice';
import AmapSearch from '@/pages/electronicsMap/Amap/search';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';

export const deviceList = {url: '/electronicMap/list', method: 'POST'};

const {AMAP_KEY, AMAP_VERSION} = config;

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
              lat: item.latitude,
              lng: item.longitude
            }
          });
        }
      });
      setPositions(list);
    }
  });

  const searchRef = useRef(null);

  const events = {
    dragend: () => {
      searchRef.current.center(true);
    },
    dragging: (v) => {
      searchRef.current.center(false);
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
      searchRef.current.center(true);
    }
  }, [center]);

  return <Spin spinning={devicesLoading} tip="正在查询设备，请稍后...">
    <div style={{height: '100vh'}}>
      <Map events={events} amapkey={AMAP_KEY} center={center} version={AMAP_VERSION} zoom={16}>
        <AmapSearch
          positions={positions}
          ref={searchRef}
          onCenter={(position) => {
            // setPositions(markers(bounds.center));
            console.log(position);
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
