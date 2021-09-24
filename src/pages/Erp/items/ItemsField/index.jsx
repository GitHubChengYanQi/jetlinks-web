/**
 * 产品表字段配置页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React from 'react';
import {Input, InputNumber, Select as AntdSelect} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../ItemsUrl';
import DatePicker from '@/components/DatePicker';


const w = 200;

export const Name = (props) =>{
  return (<Input style={{ width: w }} {...props}/>);
};
export const ShelfLife = (props) =>{
  return (<><InputNumber min={0} min={0}  {...props}/>&nbsp;&nbsp;天</>);
};
export const Inventory = (props) =>{
  return (<InputNumber min={0} min={0} {...props}/>);
};
export const ProductionTime = (props) =>{
  return (<DatePicker  style={{ width: w }}  {...props} />);
};
export const Important = (props) =>{
  return (<InputNumber min={0} min={0} {...props}/>);
};
export const Weight = (props) =>{
  return (<InputNumber min={0} min={0} {...props}/>);
};
export const MaterialId = (props) =>{
  return (<Select style={{ width: w }} api={apiUrl.materialIdSelect} {...props}/>);
};
export const Cost = (props) =>{
  return (<InputNumber min={0} min={0} {...props}/>);
};
export const Vulnerability = (props) =>{
  return (<AntdSelect   style={{ width: w }} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:'0',label:'易损'},{value:'1',label:'不易损'}]} {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select   api={apiUrl.brandIdSelect} {...props}/>);
};
