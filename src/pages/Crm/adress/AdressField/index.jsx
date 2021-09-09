/**
 * 客户地址表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React, {useState} from 'react';
import Cascader from '@/components/Cascader';
import {Input, InputNumber} from 'antd';
import * as apiUrl from '../AdressUrl';
import Amap from '@/components/Amap';


export const Location = (props) => {
  return (<Input  {...props} />);
};
export const Longitude = (props) => {
  return (<InputNumber   {...props} />);
};
export const Latitude = (props) => {
  return (<InputNumber   {...props} />);
};
export const Region = (props) => {
  return (<Cascader api={apiUrl.commonArea}   {...props} />);
};
export const CustomerId = (props) => {
  props.onChange(props.customerId);
  return (<Input   {...props} />);
};

export const Map = (props) => {

  const [location, setLocation] = useState(props.value  && props.value);

  return (
    <>
      <Input value={location && location.address} style={{width:'60%',marginRight:20,display:'inline-block'}} />
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
};

