import React, {useState} from 'react';
import {Input, InputNumber} from 'antd';
import Amap from '@/components/Amap';

const AdressMap = (props) => {

  const [location, setLocation] = useState(props.value || {});

  return (
    <>
      <Input {...props} value={location && location.address} style={{width:'60%',marginRight:20,display:'inline-block'}} onChange={(value)=>{
        setLocation({...location,address:value.target.value});
        props.onChange({address:value.target.value,map:location.location,city:location.city});
      }} />
      <div style={{textAlign: 'center',display:'inline-block'}}>
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
    </>
  );
};

export default AdressMap;
