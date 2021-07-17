/**
 * 出库表字段配置页
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../outboundUrl';

export const StockId = (props) =>{
  return (<Input {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.itemIdSelect} {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
export const Outtime = (props) =>{
  return (<Input {...props}/>);
};
export const PlaceId = (props) =>{
  return (<Select api={apiUrl.placeIdSelect} {...props}/>);
};
