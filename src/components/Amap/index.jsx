import React, {useRef, useState} from 'react';
import {Map} from 'react-amap';
import {config} from 'ice';
import {Button, Drawer} from 'antd';
import AmapSearch from '@/components/Amap/search';
import Icon from '@/components/Icon';

const {AMAP_KEY, AMAP_VERSION} = config;

const Amap = ({title, value, onClose, onChange, show,noAction}) => {
  const [visible, setVisible] = useState(false);
  const [center, setCenter] = useState({});

  const mapRef = useRef(null);

  const events = {
    dragend: () => {
      mapRef.current.setCenter(true);
    },
    dragging: (v) => {
      mapRef.current.setCenter(false);
    }
  };

  const map = () => {
    return <div style={{height: 'calc(100% - 56px)'}}>
      <Map events={events} amapkey={AMAP_KEY} center={center} version={AMAP_VERSION} zoom={16}>
        <AmapSearch noAction={noAction} value={value} ref={mapRef} center={(value) => {
          setCenter({longitude: value.lgn, latitude: value.lat});
        }} onChange={(value) => {
          setVisible(false);
          typeof onChange === 'function' && onChange(value);
        }}/>
      </Map>
    </div>;
  };

  if (show) {
    return map();
  }

  return (
    <>
      <Button type="text" onClick={() => {
        setVisible(true);
      }}><Icon type="icon-dingwei"/>{title || '定位'}</Button>
      <Drawer
        destroyOnClose
        visible={visible}
        onClose={() => {
          setVisible(false);
          typeof onClose === 'function' && onClose();
        }}
        width="50%"
        title={title}>
        {map()}
      </Drawer>
    </>

  );
};
export default Amap;
