/**
 * 报价表字段配置页
 *
 * @author ta
 * @Date 2021-07-17 15:28:13
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../quoteUrl';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const QuoteId = (props) =>{
  return (<Input {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Prices = (props) =>{
  return (<InputNumber {...props}/>);
};
export const QuotePhases = (props) =>{
  return (<AntdSelect options={[
    {label:'niu',label:'牛'}{label:'hou',label:'猴子'}
  ]} {...props}/>);
};
export const People = (props) =>{
  return (<Input {...props}/>);
};
