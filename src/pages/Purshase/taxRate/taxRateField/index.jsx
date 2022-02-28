/**
 * 字段配置页
 *
 * @author
 * @Date 2021-12-21 11:29:07
 */

import React from 'react';
import {Input} from 'antd';
import InputNumber from '@/components/InputNumber';

export const TaxRateName = (props) =>{
  return (<Input {...props}/>);
};
export const TaxRateValue = (props) =>{
  return (<><InputNumber {...props} addonAfter={<span>%</span>}/></>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
