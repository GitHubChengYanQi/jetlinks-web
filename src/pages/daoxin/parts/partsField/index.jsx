/**
 * 清单字段配置页
 *
 * @author 
 * @Date 2021-07-14 14:30:20
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../partsUrl';

export const ItemId = (props) =>{
  return (<Select api={apiUrl.itemIdSelect} {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select api={apiUrl.brandIdSelect} {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
