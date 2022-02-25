/**
 * 物品分类表字段配置页
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../categoryUrl';
import {categoryTree} from '@/pages/Erp/spu/spuUrl';
import {useRequest} from '@/util/Request';

export const Pid = (props) =>{

  return (<Cascader top api={categoryTree} {...props}/>);
};
export const CategoryName = (props) =>{
  return (<Input style={{width:200}} {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const Scort = (props) =>{
  return (<InputNumber {...props}/>);
};
