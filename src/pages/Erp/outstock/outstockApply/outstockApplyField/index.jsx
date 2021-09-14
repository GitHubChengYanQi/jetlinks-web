/**
 * 出库申请字段配置页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../outstockApplyUrl';

export const ApplyState = (props) =>{
  return (<Input {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select api={apiUrl.Brands} {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.Items} {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber {...props}/>);
};
