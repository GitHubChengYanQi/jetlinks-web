import React, {useState} from 'react';
import {Input,  Space} from 'antd';
import Amap from '@/components/Amap';
import InputNumber from '@/components/InputNumber';

const AdressMap = ({width,value,onChange,disabled,...props}) => {
  console.log(value);

  const [location, setLocation] = useState(value || {});

  return (
    <Space>
      <Input {...props} disabled={disabled} value={location && location.address} style={{width}} onChange={(value)=>{
        setLocation({...location,address:value.target.value});
        onChange({address:value.target.value,map:location.location,city:location.city});
      }} />
      <div>
        <InputNumber min={0}
          style={{display: 'none'}}
          hidden
          value={location && location.location && location.length > 0 && location[0]}
        />
        <InputNumber min={0}
          style={{display: 'none'}}
          hidden
          value={location && location.location && location.length > 0 && location[1]}
        />
        <Amap value={value} onChange={(value) => {
          setLocation(value);
          onChange({address:value.address,map:value.location,city:value.city});
        }} />
      </div>
    </Space>
  );
};

export default AdressMap;
