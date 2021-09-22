/**
 * 跟进内容字段配置页
 *
 * @author cheng
 * @Date 2021-09-17 10:35:56
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../businessTrackUrl';
import {CustomerId} from '../businessTrackUrl';

export const Message = (props) =>{
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
export const Tixing = (props) =>{
  return (<Input {...props}/>);
};
export const Type = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const Time = (props) =>{
  return (<Input {...props}/>);
};
export const Note = (props) =>{
  return (<Input {...props}/>);
};
export const Image = (props) =>{
  return (<Input {...props}/>);
};
export const Longitude = (props) =>{
  return (<Input {...props}/>);
};
export const Latitude = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
export const Classify = (props) =>{
  return (<Input {...props}/>);
};
export const ClassifyId = (props) =>{
  return (<Input {...props}/>);
};
export const TrackMessageId = (props) =>{
  return (<Input {...props}/>);
};
export const Customer = (props) =>{
  return (<Select width={200} api={apiUrl.CustomerId} {...props}/>);
};
