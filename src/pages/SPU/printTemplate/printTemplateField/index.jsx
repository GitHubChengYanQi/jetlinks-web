/**
 * 编辑模板字段配置页
 *
 * @author Captain_Jazz
 * @Date 2021-12-28 13:24:55
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../printTemplateUrl';
import Editor from '@/components/Editor';

export const Type = (props) =>{
  return (<AntdSelect style={{width:200}} options={[{label:'实物详情',value:'PHYSICALDETAIL'}]} {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Templete = (props) =>{
  const {type,...other} = props;
  return (<Editor type={type} {...other} />);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
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
