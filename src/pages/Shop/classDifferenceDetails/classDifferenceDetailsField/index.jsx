/**
 * 分类明细内容字段配置页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:52
 */

import React from 'react';
import {Input} from 'antd';
import UpLoadImg from '@/components/Upload';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const Link = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
export const ClassDifferenceId = (props) =>{
  const {classDifferenceId} = props;
  props.onChange(classDifferenceId || null);
  return (<Input {...props}/>);
};
export const ClassDifference = (props) =>{
  return (<Input {...props}/>);
};
