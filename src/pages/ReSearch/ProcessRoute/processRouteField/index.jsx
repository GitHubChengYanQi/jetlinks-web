/**
 * 工艺路线列表字段配置页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 14:12:28
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../processRouteUrl';

export const ProcessRouteId = (props) =>{
  return (<Input {...props}/>);
};
export const ProcessRouteCoding = (props) =>{
  return (<Input {...props}/>);
};
export const ProcessRoteName = (props) =>{
  return (<Input {...props}/>);
};
export const PartsId = (props) =>{
  return (<Input {...props}/>);
};
export const Version = (props) =>{
  return (<Input {...props}/>);
};
export const Status = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
