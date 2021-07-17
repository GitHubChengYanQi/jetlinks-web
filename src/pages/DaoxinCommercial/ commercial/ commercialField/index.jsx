/**
 * 商机表字段配置页
 *
 * @author ta
 * @Date 2021-07-17 15:28:13
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../ commercialUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const QuoteId = (props) =>{
  return (<Input {...props}/>);
};
export const Phases = (props) =>{
  return (<AntdSelect options={[{label:'wq',label:'王琦'}{label:'qr',label:'奇瑞'}]} {...props}/>);
};
export const Source = (props) =>{
  return (<Input {...props}/>);
};
export const State = (props) =>{
  return (<AntdSelect options={[{label:'yx',label:'延续'}{label:'tq',label:'塔'}]} {...props}/>);
};
export const Main = (props) =>{
  return (<Input {...props}/>);
};
