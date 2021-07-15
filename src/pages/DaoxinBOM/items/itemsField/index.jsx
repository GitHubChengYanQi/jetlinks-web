/**
 * 物品表字段配置页
 *
 * @author 
 * @Date 2021-07-14 14:04:26
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../itemsUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const ShelfLife = (props) =>{
  return (<Input {...props}/>);
};
export const Inventory = (props) =>{
  return (<Input {...props}/>);
};
export const ProductionTime = (props) =>{
  return (<Input {...props}/>);
};
export const Important = (props) =>{
  return (<Input {...props}/>);
};
export const Weight = (props) =>{
  return (<Input {...props}/>);
};
export const MaterialId = (props) =>{
  return (<Select api={apiUrl.materialIdSelect} {...props}/>);
};
export const Cost = (props) =>{
  return (<Input {...props}/>);
};
export const Vulnerability = (props) =>{
  return (<Input {...props}/>);
};
