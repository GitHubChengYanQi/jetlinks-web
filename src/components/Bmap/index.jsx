import React, {useRef, useState, useImperativeHandle, useEffect} from 'react';
import {Map} from 'react-bmapgl';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import {deviceList, mapNum} from '@/components/Amap';
import MapContent from './map';

const Bmap = ({
  onMarkerClick = () => {
  },
  onHistory = () => {
  },
}, ref) => {

  const mapRef = useRef();

  const [center, setCenter] = useState({});
  const [params, setParams] = useState({});
  const [positions, setPositions] = useState([]);

  const {loading, run: getDeviceList} = useRequest(deviceList, {
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

  const {run: getMapNum, data: mapNumber} = useRequest(mapNum, {manual: true});

  const submit = async (newParams = {}, reset) => {
    const data = reset ? newParams : {...params, ...newParams,};
    setParams(data);
    getMapNum({data});
    const res = await getDeviceList({data});
    const device = isArray(res).find(item => item.latitude && item.longitude);
    if (device) {
      setCenter({lng: device.longitude, lat: device.latitude});
    }
  };

  useEffect(() => {
    submit();
  }, []);

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return <div style={{position: 'relative', height: '100%'}}>
    <Map
      onMoveend={() => {
        mapRef.current.getBounds();
      }}
      onZoomend={() => {
        mapRef.current.getBounds();
      }}
      center={center}
      zoom={12}
      enableScrollWheelZoom
      style={{height: '100%'}}
    >
      <MapContent
        loading={loading}
        onMarkerClick={onMarkerClick}
        onHistory={onHistory}
        positions={positions}
        ref={mapRef}
        mapNum={mapNumber}
        onBounds={(bounds = {}) => {
          const locationParams = [
            bounds.northwest,
            bounds.southeast
          ];
          getDeviceList({data: {locationParams, ...params}});
        }}
      />
    </Map>
  </div>;
};

export default React.forwardRef(Bmap);
