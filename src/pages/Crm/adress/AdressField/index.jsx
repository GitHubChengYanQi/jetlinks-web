/**
 * 客户地址表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../AdressUrl';
import {} from '../AdressUrl';
const w = 200;

export const Location = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
export const Longitude = (props) =>{
  return (<InputNumber  style={{width:w}} {...props}/>);
};
export const Latitude = (props) =>{
  return (<InputNumber style={{width:w}}  {...props}/>);
};
