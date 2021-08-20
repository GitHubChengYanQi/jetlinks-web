/**
 * 轮播图字段配置页
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React from 'react';
import {Input, InputNumber} from 'antd';
import UpLoadImg from '@/components/Upload';
import Select from '@/components/Select';
import Links from '@/pages/Portal/Links';
import * as apiUrl from '../bannerUrl';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props} />);
};
export const Sort = (props) =>{
  return (<InputNumber {...props}/>);
};
export const Link = (props) =>{
  return (<Links {...props}/>);
};
export const Difference = (props) =>{
  return (<Select api={apiUrl.Difference} {...props}/>);
};
