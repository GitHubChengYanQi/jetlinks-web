/**
 * 字段配置页
 *
 * @author  
 * @Date 2021-08-20 13:14:51
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../deliveryDetailsUrl';

export const ItemId = (props) =>{
  return (<Input {...props}/>);
};
export const CustomerId = (props) =>{
  return (<Input {...props}/>);
};
export const AdressId = (props) =>{
  return (<Input {...props}/>);
};
export const ContactsId = (props) =>{
  return (<Input {...props}/>);
};
export const PhoneId = (props) =>{
  return (<Input {...props}/>);
};
export const StockItemId = (props) =>{
  return (<Input {...props}/>);
};
export const DeliveryId = (props) =>{
  return (<Input {...props}/>);
};
