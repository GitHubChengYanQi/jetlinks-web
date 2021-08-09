/**
 * 客户地址表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React from 'react';
import {Input,InputNumber} from 'antd';
import {} from '../AdressUrl';
const w = 200;

export const Location = (props) =>{
  return (<Input  {...props}/>);
};
export const Longitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Latitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
