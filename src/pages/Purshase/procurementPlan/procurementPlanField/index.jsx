/**
 * 采购计划主表字段配置页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../procurementPlanUrl';

export const ProcurementPlanName = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Input {...props}/>);
};
export const Remark = (props) =>{
  return (<Input {...props}/>);
};
export const NeedLevel = (props) =>{
  return (<Input {...props}/>);
};
export const IsSpupplier = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const Status = (props) =>{
  return (<Input {...props}/>);
};
export const DeliveryDate = (props) =>{
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
