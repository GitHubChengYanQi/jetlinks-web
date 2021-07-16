/**
 * 客户表字段配置页
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../clientUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Adress = (props) =>{
  return (<Input {...props}/>);
};
export const Phone = (props) =>{
  return (<Input {...props}/>);
};
export const OrderId = (props) =>{
  return (<Select api={apiUrl.orderIdSelect} {...props}/>);
};
export const OrderTime = (props) =>{
  return (<Input {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const LogisticsId = (props) =>{
  console.log(props);
  return (<Select api={apiUrl.logisticsIdSelect} {...props}/>);
};
