/**
 * 采购计划单子表整合数据后的子表字段配置页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../procurementPlanDetalUrl';

export const PlanId = (props) =>{
  return (<Input {...props}/>);
};
export const SkuId = (props) =>{
  return (<Input {...props}/>);
};
export const Total = (props) =>{
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
