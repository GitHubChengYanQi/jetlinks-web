/**
 * 付款模板详情字段配置页
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../paymentTemplateDetailUrl';

export const TemplateId = (props) =>{
  return (<Input {...props}/>);
};
export const Money = (props) =>{
  return (<Input {...props}/>);
};
export const Percentum = (props) =>{
  return (<Input {...props}/>);
};
export const PayType = (props) =>{
  return (<Input {...props}/>);
};
export const PayTime = (props) =>{
  return (<Input {...props}/>);
};
export const DateWay = (props) =>{
  return (<Input {...props}/>);
};
export const DateNumber = (props) =>{
  return (<Input {...props}/>);
};
