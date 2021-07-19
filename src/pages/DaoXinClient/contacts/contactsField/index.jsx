/**
 * 联系人表字段配置页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../contactsUrl';

export const ContactsId = (props) =>{
  return (<Input {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Job = (props) =>{
  return (<Input {...props}/>);
};
export const Phone = (props) =>{
  return (<Input {...props}/>);
};
