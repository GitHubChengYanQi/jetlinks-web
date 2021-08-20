/**
 * 首页商品详情字段配置页
 *
 * @author siqiang
 * @Date 2021-08-19 13:30:45
 */

import React from 'react';
import {Input} from 'antd';
import Select from '@/components/Select';
import TextArea from "antd/es/input/TextArea";
import * as apiUrl from '../goodsDetailsUrl';

export const GoodId = (props) =>{
  return (<Select  api={apiUrl.goodslistSelect}{...props} />);
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
