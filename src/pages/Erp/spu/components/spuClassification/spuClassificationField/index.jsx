/**
 * SPU分类字段配置页
 *
 * @author song
 * @Date 2021-10-25 17:52:03
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../spuClassificationUrl';
import {spuClassificationTreeVrew} from '../spuClassificationUrl';

export const Name = (props) =>{
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

export const Sort = (props) =>{
  return (<InputNumber {...props}/>);
};


export const CodingClass = (props) =>{
  return (<Input placeholder='大写字母或数字' {...props}/>);
};

export const Pid = (props) =>{
  return (<Cascader api={spuClassificationTreeVrew} {...props}/>);
};
