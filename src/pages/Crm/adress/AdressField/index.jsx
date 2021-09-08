/**
 * 客户地址表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React from 'react';
import Cascader from '@/components/Cascader';
import {Input,InputNumber} from 'antd';
import * as apiUrl from '../AdressUrl';




export const Location = (props) =>{
  return (<Input  {...props}/>);
};
export const Longitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Latitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Region = (props) =>{
  return (<Cascader api={apiUrl.commonArea}   {...props}/>);
};
export const CustomerId = (props) =>{
  props.onChange(props.customerId);
  return (<Input   {...props}/>);
};

