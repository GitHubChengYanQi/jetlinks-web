/**
 * 首页商品详情字段配置页
 *
 * @author siqiang
 * @Date 2021-08-19 13:30:45
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../goodsDetailsUrl';
import TextArea from "antd/es/input/TextArea";

export const GoodId = (props) =>{
  return (<Input {...props}/>);
};
export const DetailBannerId = (props) =>{
  return (<Input {...props}/>);
};
export const Title = (props) =>{
  return (<TextArea  row={4} {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const LastPrice = (props) =>{
  return (<Input {...props}/>);
};
export const Server = (props) =>{
  return (<TextArea {...props}/>);
};
export const SpecificationId = (props) =>{
  return (<Input {...props}/>);
};
export const Details = (props) =>{
  return (<TextArea  row={6}  {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
