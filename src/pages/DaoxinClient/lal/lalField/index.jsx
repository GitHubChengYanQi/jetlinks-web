/**
 * 经纬度表字段配置页
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../lalUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const EwItude = (props) =>{
  return (<Input {...props}/>);
};
export const SnItude = (props) =>{
  return (<Input {...props}/>);
};
