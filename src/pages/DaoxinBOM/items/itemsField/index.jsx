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
import '../../../Css/index.scss';
import {DatePicker2} from '@alifd/next';

const { RangePicker } = DatePicker;


export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const ShelfLife = (props) =>{
  return (<InputNumber style={{ width: 200 }}  {...props}/>);
};
export const Inventory = (props) =>{
  return (<InputNumber style={{ width: 200 }} {...props}/>);
};
export const ProductionTime = (props) =>{
  return (<DatePicker2 showTime {...props} />);
};
export const Important = (props) =>{
  return (<InputNumber style={{ width: 200 }} {...props}/>);
};
export const Weight = (props) =>{
  return (<InputNumber style={{ width: 200 }} {...props}/>);
};
export const MaterialId = (props) =>{
  return (<Select api={apiUrl.materialIdSelect} {...props}/>);
};
export const Cost = (props) =>{
  return (<InputNumber style={{ width: 200 }} {...props}/>);
};
export const Vulnerability = (props) =>{
  return (<AntdSelect showSearch style={{ width: 200 }} filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:'0',label:'易损'},{value:'1',label:'不易损'}]} {...props}/>);
};
