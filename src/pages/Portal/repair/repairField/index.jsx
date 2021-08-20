/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../repairUrl';

export const CompanyId = (props) =>{
  return (<Select api={apiUrl.companyIdSelect} {...props}/>);
};
export const ItemImgUrl = (props) =>{
  return (<Input {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.itemIdSelect} {...props}/>);
};
export const ServiceType = (props) =>{
  return (<Input {...props}/>);
};
export const ExpectTime = (props) =>{
  return (<Input {...props}/>);
};
export const Comment = (props) =>{
  return (<Input {...props}/>);
};
export const Progress = (props) =>{
  return (<Input {...props}/>);
};
export const Money = (props) =>{
  return (<Input {...props}/>);
};
export const QualityType = (props) =>{
  return (<Input {...props}/>);
};
export const ContractType = (props) =>{
  return (<Input {...props}/>);
};
