/**
 * 客户地址表字段配置页
 *
 * @author 
 * @Date 2021-07-16 12:55:35
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
export const Adress1Id = (props) =>{
  return (<Input {...props}/>);
};
export const Adress1 = (props) =>{
  return (<Input {...props}/>);
};
export const Adress2Id = (props) =>{
  return (<Input {...props}/>);
};
export const Adress2 = (props) =>{
  return (<Input {...props}/>);
};
