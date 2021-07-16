/**
 * 客户管理表字段配置页
 *
 * @author
 * @Date 2021-07-16 12:55:35
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';

import Select from '@/components/Select';
import * as apiUrl from '../clientUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const AdressId = (props) =>{
  return (<Input {...props}/>);
};
export const Phone1 = (props) =>{
  return (<Input {...props}/>);
};
export const OrderId = (props) =>{
  return (<Select api={apiUrl.orderIdSelect} {...props}/>);
};
export const OrderTime = (props) =>{
  return (<Input {...props}/>);
};
export const Phone2 = (props) =>{
  return (<Input {...props}/>);
};
export const Setup = (props) =>{
  return (<TimePicker {...props}/>);
};
export const Legal = (props) =>{
  return (<Input {...props}/>);
};
export const Utscc = (props) =>{
  return (<Input {...props}/>);
};
export const CompanyType = (props) =>{
  return (<Input {...props}/>);
};
export const BusinessTerm = (props) =>{
  return (<DatePicker {...props}/>);
};
export const SignIn = (props) =>{
  return (<Input {...props}/>);
};
export const Introduction = (props) =>{
  return (<Input {...props}/>);
};
