/**
 * 操作日志字段配置页
 *
 * @author
 * @Date 2021-11-05 11:42:40
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../operationLogUrl';
import {userIdSelect} from '@/pages/Portal/remind/remindUrl';

export const LogType = (props) =>{
  return (<Input {...props}/>);
};
export const LogName = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Select api={userIdSelect} {...props}/>);
};
export const ClassName = (props) =>{
  return (<Input {...props}/>);
};
export const Method = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Succeed = (props) =>{
  return (<Input {...props}/>);
};
export const Message = (props) =>{
  return (<Input {...props}/>);
};
