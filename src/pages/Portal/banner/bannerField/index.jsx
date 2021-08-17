/**
 * 轮播图字段配置页
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React from 'react';
import {Input} from 'antd';
import Upload from '@/components/Upload';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<Upload {...props} />);
};
