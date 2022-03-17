/**
 * 字段配置页
 *
 * @author Captain_Jazz
 * @Date 2022-03-15 08:54:48
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../commonMediaUrl';

export const Path = (props) =>{
  return (<Input {...props}/>);
};
export const Endpoint = (props) =>{
  return (<Input {...props}/>);
};
export const Bucket = (props) =>{
  return (<Input {...props}/>);
};
export const Status = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
