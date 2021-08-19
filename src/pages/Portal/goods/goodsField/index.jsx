/**
 * 首页商品字段配置页
 *
 * @author siqiang
 * @Date 2021-08-19 08:53:11
 */

import React from 'react';
import {Input} from 'antd';
import UpLoadImg from "@/components/Upload";
import TextArea from "antd/es/input/TextArea";

export const GoodName = (props) =>{
  return (<Input {...props}/>);
};
export const Title = (props) =>{
  return (<TextArea rows={4} {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const LastPrice = (props) =>{
  return (<Input {...props}/>);
};
export const Comment = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props} />);
};
