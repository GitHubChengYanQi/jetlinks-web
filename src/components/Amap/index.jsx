import React, {useRef, useState} from 'react';
import {Map} from 'react-amap';
import {config} from 'ice';
import AmapSearch from '@/components/Amap/search';

export const deviceList = {url: '/electronicMap/list', method: 'POST'};
export const mapNum = {url: '/electronicMap/mapNum', method: 'POST', data: {}};

const Amap = ({
  value = [],
  onChange = () => {
  },
}) => {

  const {AMAP_KEY, AMAP_VERSION} = config;

  const [center, setCenter] = useState(value.length > 0 ? {longitude: value[0], latitude: value[1]} : {});

  const mapRef = useRef(null);

  const events = {
    moveend: () => {
      mapRef.current && mapRef.current.setCenter(true);
    },
    dragend: () => {
      mapRef.current && mapRef.current.setCenter(true);
    },
    dragging: () => {
      mapRef.current && mapRef.current.setCenter(false);
    }
  };

  return (
    <div style={{height: 'calc(100vh - 90px)'}}>
      <Map events={events} amapkey={AMAP_KEY} center={center} version={AMAP_VERSION} zoom={16}>
        <AmapSearch
          value={value}
          ref={mapRef}
          center={(value) => {
            setCenter({longitude: value.lng, latitude: value.lat});
          }}
          onChange={(value) => {
            onChange(value);
          }}
        />
      </Map>
    </div>
  );
};
export default Amap;
