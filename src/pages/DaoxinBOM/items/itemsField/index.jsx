/**
 * 物品表字段配置页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Space} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../itemsUrl';
import {DatePicker2} from '@alifd/next';

const { RangePicker } = DatePicker;

const w = 200;

export const Name = (props) =>{
  return (<Input style={{ width: w }} {...props}/>);
};
export const ShelfLife = (props) =>{
  return (<InputNumber style={{ width: w }}  {...props}/>);
};
export const Inventory = (props) =>{
  return (<InputNumber style={{ width: w }} {...props}/>);
};
export const ProductionTime = (props) =>{
  return (<DatePicker2  style={{ width: w }} showTime {...props} />);
};
export const Important = (props) =>{
  return (<InputNumber style={{ width: w }} {...props}/>);
};
export const Weight = (props) =>{
  return (<InputNumber  style={{ width: w }} {...props}/>);
};
export const MaterialId = (props) =>{
  return (<Select style={{ width: w }} api={apiUrl.materialIdSelect} {...props}/>);
};
export const Cost = (props) =>{
  return (<InputNumber style={{ width: w }} {...props}/>);
};
export const Vulnerability = (props) =>{
  return (<AntdSelect showSearch  style={{ width: w }} filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:'0',label:'易损'},{value:'1',label:'不易损'}]} {...props}/>);
};
