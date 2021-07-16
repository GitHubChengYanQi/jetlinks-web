/**
 * 物流表字段配置页
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../logisticsUrl';

export const OrderId = (props) =>{
  return (<Select api={apiUrl.orderIdSelect} {...props}/>);
};
export const ClientId = (props) =>{
  return (<Select api={apiUrl.clientIdSelect} {...props}/>);
};
export const Position = (props) =>{
  return (<Input {...props}/>);
};
export const Adress = (props) =>{
  return (<Input {...props}/>);
};
export const Phone = (props) =>{
  return (<Input {...props}/>);
};
