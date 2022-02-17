import React, {useState} from 'react';
import {Input, InputNumber, Space} from 'antd';
import Amap from '@/components/Amap';

const AdressMap = (props) => {

  const [location, setLocation] = useState(props.value || {});

  return (
    <Space>
      <Input {...props} value={location && location.address} style={{}} onChange={(value)=>{
        setLocation({...location,address:value.target.value});
        props.onChange({address:value.target.value,map:location.location,city:location.city});
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
        <Amap onChange={(value) => {
          setLocation(value);
          props.onChange({address:value.address,map:value.location,city:value.city});
        }} />
      </div>
    </Space>
  );
};

export default AdressMap;
