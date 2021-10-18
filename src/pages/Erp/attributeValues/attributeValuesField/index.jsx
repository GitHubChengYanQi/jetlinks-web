/**
 * 产品属性数据表字段配置页
 *
 * @author song
 * @Date 2021-10-18 11:30:54
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../attributeValuesUrl';

export const Difference = (props) =>{
  return (<Select api={apiUrl.itemAttributeListSelect} {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
export const Text = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
