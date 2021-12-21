/**
 * 供应商开票字段配置页
 *
 * @author song
 * @Date 2021-12-20 11:29:00
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../invoiceUrl';

export const CustomerId = (props) =>{
  return (<Input {...props}/>);
};
export const Bank = (props) =>{
  return (<Input {...props}/>);
};
export const BankAccount = (props) =>{
  return (<Input {...props}/>);
};
export const CreditCode = (props) =>{
  return (<Input {...props}/>);
};
export const Email = (props) =>{
  return (<Input {...props}/>);
};
export const IsDefault = (props) =>{
  return (<Radio.Group {...props} defaultValue={0}>
    <Radio value={1}>是</Radio>
    <Radio value={0}>否</Radio>
  </Radio.Group>);
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
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
