/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:16:16
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../companyAddressUrl';

export const RepairId = (props) =>{
  return (<Input {...props}/>);
};
export const AddressId = (props) =>{
  return (<Input {...props}/>);
};
export const Province = (props) =>{
  return (<Input {...props}/>);
};
export const City = (props) =>{
  return (<Input {...props}/>);
};
export const Area = (props) =>{
  return (<Input {...props}/>);
};
export const Address = (props) =>{
  return (<Input {...props}/>);
};
export const People = (props) =>{
  return (<Input {...props}/>);
};
export const Position = (props) =>{
  return (<Input {...props}/>);
};
export const Telephone = (props) =>{
  return (<Input {...props}/>);
};
