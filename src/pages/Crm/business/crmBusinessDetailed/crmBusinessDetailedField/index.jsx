/**
 * 项目明细表字段配置页
 *
 * @author qr
 * @Date 2021-08-04 13:17:57
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../crmBusinessDetailedUrl';

export const BusinessId = (props) =>{
  return (<Input {...props}/>);
};
export const ItemId = (props) =>{
  return (<Input {...props}/>);
};
export const Quantity = (props) =>{
  return (<Input {...props}/>);
};
export const salePrice = (props) =>{
  return (<Input {...props}/>);
};
export const totalPrice = (props) =>{
  return (<Input {...props}/>);
};
