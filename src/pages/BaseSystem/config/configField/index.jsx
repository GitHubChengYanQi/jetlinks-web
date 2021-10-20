/**
 * 参数配置字段配置页
 *
 * @author
 * @Date 2021-10-20 10:50:00
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../configUrl';
import {dictTypeListSelect} from '../configUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Code = (props) =>{
  return (<Input {...props}/>);
};
export const DictFlag = (props) =>{
  return (<Input {...props}/>);
};
export const DictTypeId = (props) =>{
  return (<Select api={dictTypeListSelect} {...props}/>);
};
export const Value = (props) =>{
  return (<Input {...props}/>);
};
export const Remark = (props) =>{
  return (<Input {...props}/>);
};
