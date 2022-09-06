/**
 * 操作日志字段配置页
 *
 * @author
 * @Date 2021-11-05 11:42:40
 */

import React from 'react';
import {Input} from 'antd';
import Select from '@/components/Select';

export const LogType = (props) =>{
  return (<Input {...props}/>);
};
export const LogName = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Select {...props}/>);
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
