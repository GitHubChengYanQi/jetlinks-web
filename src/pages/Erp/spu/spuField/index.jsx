/**
 * 字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../spuUrl';
import {categoryList, categoryTree} from '../spuUrl';

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
  return (<Input {...props}/>);
};
export const Cost = (props) =>{
  return (<Input {...props}/>);
};
export const Vulnerability = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
export const ClassId = (props) =>{
  return (<Input {...props}/>);
};
export const UnitId = (props) =>{
  return (<Input {...props}/>);
};
export const CategoryId = (props) =>{
  return (<Cascader api={categoryTree} {...props}/>);
};
export const AttributeId = (props) =>{
  return (<Input {...props}/>);
};
