/**
 * sku详情表字段配置页
 *
 * @author 
 * @Date 2021-10-18 14:14:21
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../skuValuesUrl';

export const SkuId = (props) =>{
  return (<Input {...props}/>);
};
export const AttributeId = (props) =>{
  return (<Input {...props}/>);
};
export const AttributeValuesId = (props) =>{
  return (<Input {...props}/>);
};
