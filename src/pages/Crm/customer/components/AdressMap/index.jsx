import React, {useState} from 'react';
import {Input, InputNumber} from 'antd';
import Amap from '@/components/Amap';

const AdressMap = (props) => {

  const [location, setLocation] = useState(props.value  && props.value);

  return (
    <>
      <Input value={location && location.address} style={{width:'60%',marginRight:20,display:'inline-block'}} onChange={(value)=>{
        props.onChange({address:value.target.value});
      }} />
      <div style={{textAlign: 'center',display:'inline-block'}}>
        <InputNumber
          style={{display: 'none'}}
          hidden
          value={location && location.location && location.length > 0 && location[0]}
        />
        <InputNumber
          style={{display: 'none'}}
          hidden
          value={location && location.location && location.length > 0 && location[1]}
        />
        <Amap title="客户地址定位" onChange={(value) => {
          setLocation(value);
          props.onChange({address:value.address,map:value.location});
        }} />
      </div>
    </>
  );
}

export default AdressMap;
