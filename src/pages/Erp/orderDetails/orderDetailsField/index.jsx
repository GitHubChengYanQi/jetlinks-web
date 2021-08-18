/**
 * 订单明细表字段配置页
 *
 * @author siqiang
 * @Date 2021-08-18 13:26:29
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../orderDetailsUrl';

export const itemId = (props) =>{
  return (<Select api={apiUrl.ProductNameListSelect} {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const OrderId = (props) =>{
  return (<Input {...props}/>);
};
