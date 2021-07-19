/**
 * 客户地址表字段配置页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../adressUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Location = (props) =>{
  return (<Input {...props}/>);
};
export const Longitude = (props) =>{
  return (<Input {...props}/>);
};
export const Latitude = (props) =>{
  return (<Input {...props}/>);
};
