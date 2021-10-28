/**
 * 质检方案详情字段配置页
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../qualityPlanDetailUrl';

export const PlanId = (props) =>{
  return (<Input {...props}/>);
};
export const QualityCheckId = (props) =>{
  return (<Input {...props}/>);
};
export const Operator = (props) =>{
  return (<Input {...props}/>);
};
export const StandardValue = (props) =>{
  return (<Input {...props}/>);
};
export const TestingType = (props) =>{
  return (<Input {...props}/>);
};
export const QualityAmount = (props) =>{
  return (<Input {...props}/>);
};
export const QualityProportion = (props) =>{
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
