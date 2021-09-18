/**
 * 合同产品明细字段配置页
 *
 * @author sb
 * @Date 2021-09-18 15:29:24
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../contractDetailUrl';

export const ContractId = (props) =>{
  return (<Input {...props}/>);
};
export const ItemId = (props) =>{
  return (<Input {...props}/>);
};
export const Quantity = (props) =>{
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
export const SalePrice = (props) =>{
  return (<Input {...props}/>);
};
export const TotalPrice = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
