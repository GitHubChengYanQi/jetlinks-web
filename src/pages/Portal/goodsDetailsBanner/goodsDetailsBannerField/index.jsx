/**
 * 商品轮播图字段配置页
 *
 * @author siqiang
 * @Date 2021-08-19 16:34:29
 */

import React from 'react';
import {Input} from 'antd';
import UpLoadImg from "@/components/Upload";

export const Sort = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props} />);
};

export const goodDetailsId = (props) =>{
  return (<Input {...props}/>);
};
