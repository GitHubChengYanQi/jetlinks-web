/**
 * 仓库总表字段配置页
 *
 * @author 
 * @Date 2021-07-15 11:13:02
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../stockUrl';

export const PalceId = (props) =>{
  return (<Select api={apiUrl.palceIdSelect} {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.itemIdSelect} {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select api={apiUrl.brandIdSelect} {...props}/>);
};
export const Inventory = (props) =>{
  return (<Input {...props}/>);
};
