/**
 * 字段配置页
 *
 * @author cheng
 * @Date 2021-08-12 08:47:13
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../phoneUrl';

export const ContactsId = (props) =>{
  return (<Input  {...props}/>);
};
export const PhoneNumber = (props) =>{
  return (<Input {...props}/>);
};
