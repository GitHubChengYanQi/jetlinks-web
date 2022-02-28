/**
 * 产品属性表字段配置页
 *
 * @author song
 * @Date 2021-10-18 11:28:39
 */

import React from 'react';
import {Input,Radio} from 'antd';
import InputNumber from '@/components/InputNumber';

export const Version = (props) =>{
  return (<Input {...props}/>);
};
export const attribute = (props) =>{
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
export const Scort = (props) =>{
  return (<InputNumber {...props}/>);
};

export const Standard = (props) =>{
  return (<Radio.Group {...props}>
    <Radio value={1}>是</Radio>
    <Radio value={0}>否</Radio>
  </Radio.Group>);
};
