/**
 * 行业表字段配置页
 *
 * @author
 * @Date 2021-08-02 08:25:03
 */

import React from 'react';
import {Input} from 'antd';
import Cascader from '@/components/Cascader';
import * as apiUrl from '../crmIndustryUrl';
import InputNumber from '@/components/InputNumber';

export const IndustryName = (props) =>{
  return (<Input {...props}/>);
};
export const ParentId = (props) =>{
  return (<Cascader api={apiUrl.crmIndustryTreeView} top {...props}/>);
};

export const Sort = (props) =>{
  return (<InputNumber {...props}/>);
};
