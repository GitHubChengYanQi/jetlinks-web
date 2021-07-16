/**
 * 发货表字段配置页
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../orderUrl';

export const OutboundId = (props) =>{
  return (<Select api={apiUrl.outboundIdSelect} {...props}/>);
};
export const Consignor = (props) =>{
  return (<Input {...props}/>);
};
export const ClientId = (props) =>{
  return (<Select api={apiUrl.clientIdSelect} {...props}/>);
};
export const Shipping = (props) =>{
  return (<Input {...props}/>);
};

export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const Weight = (props) =>{
  return (<Input {...props}/>);
};
export const Area = (props) =>{
  return (<Input {...props}/>);
};
