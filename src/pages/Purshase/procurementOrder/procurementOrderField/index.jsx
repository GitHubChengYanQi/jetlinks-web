/**
 * 采购单字段配置页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../procurementOrderUrl';

export const ProcurementPlanId = (props) =>{
  return (<Input {...props}/>);
};
export const Status = (props) =>{
  return (<Input {...props}/>);
};
export const Note = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
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
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
