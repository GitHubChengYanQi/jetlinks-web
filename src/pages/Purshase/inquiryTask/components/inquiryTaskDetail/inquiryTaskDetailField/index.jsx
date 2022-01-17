/**
 * 询价任务详情字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../inquiryTaskDetailUrl';

export const InquiryTaskId = (props) =>{
  return (<Input {...props}/>);
};
export const SkuId = (props) =>{
  return (<Input {...props}/>);
};
export const Total = (props) =>{
  return (<Input {...props}/>);
};
export const Remark = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
