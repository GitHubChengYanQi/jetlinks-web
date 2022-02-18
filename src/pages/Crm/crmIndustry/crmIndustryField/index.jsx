/**
 * 行业表字段配置页
 *
 * @author
 * @Date 2021-08-02 08:25:03
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../crmIndustryUrl';
import {crmIndustryListSelect, crmIndustryTreeView} from '../crmIndustryUrl';

export const IndustryName = (props) =>{
  return (<Input {...props}/>);
};
export const ParentId = (props) =>{
  return (<Cascader api={apiUrl.crmIndustryTreeView} top {...props}/>);
};
