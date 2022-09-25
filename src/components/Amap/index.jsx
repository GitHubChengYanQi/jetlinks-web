import React, {useRef, useState, useImperativeHandle} from 'react';
import {Map, Markers} from 'react-amap';
import {config} from 'ice';
import AmapSearch from '@/components/Amap/search';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import TestAmap from '@/components/Amap/testAmap';

export const deviceList = {url: '/electronicMap/list', method: 'POST'};

const Amap = ({
  show,
  value = [],
  onChange = () => {
  },
  onMarkerClick = () => {
  },
}, ref) => {

  const {AMAP_KEY, AMAP_VERSION} = config;

  const [center, setCenter] = useState(value.length > 0 ? {longitude: value[0], latitude: value[1]} : {});
  const [params, setParams] = useState({});

  const [positions, setPositions] = useState([]);

  const {run: getDeviceList} = useRequest(deviceList, {
    // debounceInterval: 300,
    manual: true,
    onSuccess: (res) => {
      const list = [];
      isArray(res).forEach(item => {
        if (item.latitude && item.longitude) {
          list.push({
            position: {
              lat: item.latitude,
              lng: item.longitude
            },
            device: item,
          });
        }
      });
      setPositions(list);
    }
  });

  const mapRef = useRef(null);

  const events = {
    moveend: () => {
      if (show) {
        mapRef.current.setCenter(true);
      }
    },
    dragend: () => {
      if (!show) {
        mapRef.current.setCenter(true);
      }
    },
    dragging: () => {
      if (!show) {
        mapRef.current.setCenter(false);
      }
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

  return (
    <div style={{height: show ? '100vh' : 'calc(100vh - 90px)'}}>
      <Map events={events} amapkey={AMAP_KEY} center={center} version={show ? null : AMAP_VERSION} zoom={16}>
        <AmapSearch
          show={show}
          value={value}
          ref={mapRef}
          center={(value) => {
            setCenter({longitude: value.lng, latitude: value.lat});
          }}
          onChange={(value) => {
            onChange(value);
          }}
          positions={positions}
          onMarkerClick={onMarkerClick}
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
  );
};
export default React.forwardRef(Amap);
