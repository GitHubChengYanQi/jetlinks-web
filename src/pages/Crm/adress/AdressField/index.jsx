/**
 * 客户地址表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React, {useState} from 'react';
import {Input, InputNumber} from 'antd';
import CascaderAdress from '@/pages/Crm/customer/components/CascaderAdress';
import AdressMap from '@/pages/Crm/customer/components/AdressMap';


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
  return (<CascaderAdress   {...props} />);
};
export const CustomerId = (props) => {
  props.onChange(props.customerId);
  return (<Input   {...props} />);
};

export const Map = (props) => {

  return (<AdressMap {...props}/>);
};

