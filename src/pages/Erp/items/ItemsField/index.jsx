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
  return (<DatePicker  style={{ width: w }}  {...props} />);
};
export const Important = (props) =>{
  return (<InputNumber {...props}
    onChange={(value)=> {
      props.onChange(value);
    }}
    onBlur={()=>{
      if(props.value>100){
        props.onChange(100);
      }else if (props.value < 0){
        props.onChange(0);
      }
    }}
    style={{ width: w }}/>);
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
  return (<AntdSelect   style={{ width: w }} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:'0',label:'易损'},{value:'1',label:'不易损'}]} {...props}/>);
};
