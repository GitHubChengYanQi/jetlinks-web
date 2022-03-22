import React, {useState} from 'react';
import {Input} from 'antd';
import Amap from '@/components/Amap';

const AdressMap = ({width, value, onChange, disabled, ...props}) => {

  const [location, setLocation] = useState(value || {});

  return (
    <div style={{flexGrow: 1,display:'flex'}}>
      <Input
        {...props}
        disabled={disabled}
        value={location && location.address}
        style={{width,flexGrow: 1}}
        onChange={(value) => {
          setLocation({...location, address: value.target.value});
          onChange({address: value.target.value, map: location.location, city: location.city});
        }} />
      <div>
        <Amap value={value} onChange={(value) => {
          setLocation(value);
          onChange({address: value.address, map: value.location, city: value.city});
        }} />
      </div>
    </div>
  );
};

export default AdressMap;
