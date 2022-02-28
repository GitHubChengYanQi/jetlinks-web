/**
 * 分类明细字段配置页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:33
 */

import React from 'react';
import {Input} from 'antd';
import InputNumber from '@/components/InputNumber';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<InputNumber min={0} {...props}/>);
};
export const ClassId = (props) =>{
  props.onChange(props.classId);
  return (<Input {...props}/>);
};
