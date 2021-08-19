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

export const GoodId = (props) =>{
  return (<Input {...props}/>);
};
export const DetailBannerId = (props) =>{
  return (<Input {...props}/>);
};
export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const LastPrice = (props) =>{
  return (<Input {...props}/>);
};
export const Server = (props) =>{
  return (<Input {...props}/>);
};
export const SpecificationId = (props) =>{
  return (<Input {...props}/>);
};
export const Details = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
