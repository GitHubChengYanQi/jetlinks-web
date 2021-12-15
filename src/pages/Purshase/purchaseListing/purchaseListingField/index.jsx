/**
 * 采购清单字段配置页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../purchaseListingUrl';

export const PurchaseAskId = (props) =>{
  return (<Input {...props}/>);
};
export const SkuId = (props) =>{
  return (<Input {...props}/>);
};
export const ApplyNumber = (props) =>{
  return (<Input {...props}/>);
};
export const AvailableNumber = (props) =>{
  return (<Input {...props}/>);
};
export const DeliveryDate = (props) =>{
  return (<Input {...props}/>);
};
export const Note = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
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
