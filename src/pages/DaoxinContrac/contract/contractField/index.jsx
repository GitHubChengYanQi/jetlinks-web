/**
 * 合同表字段配置页
 *
 * @author 
 * @Date 2021-07-21 13:36:21
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../contractUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Select api={apiUrl.userIdSelect} {...props}/>);
};
export const Note = (props) =>{
  return (<Input {...props}/>);
};
export const Time = (props) =>{
  return (<Input {...props}/>);
};
export const Content = (props) =>{
  return (<Input {...props}/>);
};
