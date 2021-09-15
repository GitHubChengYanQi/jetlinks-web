/**
 * 出库清单字段配置页
 *
 * @author cheng
 * @Date 2021-09-15 11:15:44
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../outstockListingUrl';

export const Time = (props) =>{
  return (<Input {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const BrandId = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
export const ItemId = (props) =>{
  return (<Input {...props}/>);
};
export const State = (props) =>{
  return (<Input {...props}/>);
};
export const OutstockOrderId = (props) =>{
  return (<Input {...props}/>);
};
export const OutstockApplyId = (props) =>{
  return (<Input {...props}/>);
};
