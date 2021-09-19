/**
 * 部门表字段配置页
 *
 * @author
 * @Date 2020-12-21 17:16:04
 */

import React from 'react';
import {Input,InputNumber} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import {sysDeptTreeView} from '../sysDeptUrl';

export const Pid = (props) =>{
  return (<Cascader api={sysDeptTreeView} {...props}/>);
};
export const SimpleName = (props) =>{
  return (<Input {...props}/>);
};
export const FullName = (props) =>{
  return (<Input {...props}/>);
};
export const Description = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const Sort = (props) =>{
  return (<InputNumber min={0} {...props}/>);
};
