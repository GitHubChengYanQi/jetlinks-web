/**
 * 地点表字段配置页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../StorehouseUrl';
const w = 200;

export const Name = (props) =>{
  return (<Input   {...props}/>);
};
export const Position = (props) =>{
  return (<Input   {...props}/>);
};
export const Palce = (props) =>{
  return (<Input   {...props}/>);
};
export const Longitude = (props) =>{
  return (<InputNumber min={0}   {...props}/>);
};
export const Latitude = (props) =>{
  return (<InputNumber min={0}   {...props}/>);
};
export const Measure = (props) =>{
  return (<InputNumber min={0}   {...props}/>);
};
export const Capacity = (props) =>{
  return (<InputNumber min={0}   {...props}/>);
};
