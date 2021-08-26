/**
 * 字段配置页
 *
 * @author 
 * @Date 2021-08-25 08:31:10
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../openUserInfoUrl';

export const MemberId = (props) =>{
  return (<Input {...props}/>);
};
export const Uuid = (props) =>{
  return (<Input {...props}/>);
};
export const Source = (props) =>{
  return (<Input {...props}/>);
};
export const Username = (props) =>{
  return (<Input {...props}/>);
};
export const Nickname = (props) =>{
  return (<Input {...props}/>);
};
