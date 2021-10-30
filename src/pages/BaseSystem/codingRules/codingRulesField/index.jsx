/**
 * 编码规则字段配置页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../codingRulesUrl';
import {codingRulesClassificationListSelect} from '../codingRulesUrl';

export const CodingRulesClassificationId = (props) =>{
  return (<Select api={apiUrl.codingRulesClassificationListSelect} {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const CodingRules = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
