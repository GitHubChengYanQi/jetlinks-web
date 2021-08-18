/**
 * 导航表字段配置页
 *
 * @author
 * @Date 2021-08-18 08:40:30
 */

import React from 'react';
import {Input,InputNumber} from 'antd';
import Select from '@/components/Select';
import UpLoadImg from '@/components/Upload';
import * as apiUrl from '../navigationUrl';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const Icon = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const Sort = (props) =>{
  return (<InputNumber {...props}/>);
};
export const Link = (props) =>{
  return (<Input {...props}/>);
};
export const Difference = (props) =>{
  return (<Select api={apiUrl.Difference} {...props}/>);
};

