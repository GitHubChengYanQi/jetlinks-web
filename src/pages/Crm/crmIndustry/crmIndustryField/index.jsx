/**
 * 行业表字段配置页
 *
 * @author 
 * @Date 2021-07-31 16:28:22
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../crmIndustryUrl';

export const IndustryName = (props) =>{
  return (<Input {...props}/>);
};
export const ParentId = (props) =>{
  return (<Cascader api={apiUrl.crmIndustryTreeView} {...props}/>);
};
