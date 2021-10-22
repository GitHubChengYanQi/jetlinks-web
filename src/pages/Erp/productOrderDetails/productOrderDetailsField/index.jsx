/**
 * 产品订单详情字段配置页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../productOrderDetailsUrl';

export const ProductOrderId = (props) =>{
  return (<Input {...props}/>);
};
export const SpuId = (props) =>{
  return (<Input {...props}/>);
};
export const SkuId = (props) =>{
  return (<Input {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
export const Money = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
