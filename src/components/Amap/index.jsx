import React, {useRef, useState, useImperativeHandle} from 'react';
import {Map} from 'react-amap';
import {config} from 'ice';
import AmapSearch from '@/components/Amap/search';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';

export const deviceList = {url: '/electronicMap/list', method: 'POST'};
export const mapNum = {url: '/electronicMap/mapNum', method: 'POST'};

const Amap = ({
  deviceMap,
  show,
  value = [],
  onChange = () => {
  },
  onMarkerClick = () => {
  },
  onHistory = () => {
  },
}, ref) => {

  const {AMAP_KEY, AMAP_VERSION} = config;

  const [center, setCenter] = useState(value.length > 0 ? {longitude: value[0], latitude: value[1]} : {});
  const [params, setParams] = useState({});

  const [positions, setPositions] = useState([]);

  const {run: getDeviceList} = useRequest(deviceList, {
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
            animation: 'AMAP_ANIMATION_DROP',
          });
        }
      });
      setPositions(list);
    }
  });

  const {run: getMapNum, data: mapNumber} = useRequest(mapNum, {manual: true,});

  const mapRef = useRef(null);

  const events = {
    moveend: () => {
      if (show) {
        mapRef.current && mapRef.current.setCenter(true);
      }
    },
    dragend: () => {
      if (!show) {
        mapRef.current && mapRef.current.setCenter(true);
      }
    },
    dragging: () => {
      if (!show) {
        mapRef.current && mapRef.current.setCenter(false);
      }
    }
  };

  const submit = async (newParams = {}, reset) => {
    const data = reset ? newParams : {...params, ...newParams,};
    setParams(data);
    getMapNum({data});
    if (data.place) {
      mapRef.current.getPosition(data.place);
    } else {
      const res = await getDeviceList({data});
      if (isArray(res).length > 0 && res[0].latitude && res[0].longitude) {
        setCenter({
          latitude: res[0].latitude,
          longitude: res[0].longitude
        });
      }
    }

  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div style={{height: show ? '100%' : 'calc(100vh - 90px)'}}>
      <Map events={events} amapkey={AMAP_KEY} center={center} version={show ? null : AMAP_VERSION} zoom={16}>
        <AmapSearch
          deviceMap={deviceMap}
          mapNum={mapNumber}
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
          onHistory={onHistory}
          onBounds={(bounds = {}) => {
            const locationParams = [
              bounds.northwest,
              bounds.southeast
            ];
            getDeviceList({data: {locationParams, ...params}});
          }}
        />
      </Map>
    </div>
  );
};
export default React.forwardRef(Amap);
