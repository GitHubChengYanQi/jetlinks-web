/**
 * 客户级别表字段配置页
 *
 * @author
 * @Date 2021-07-30 13:00:02
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../crmCustomerLevelUrl';

export const CustomerLevelId = (props) =>{
  return (<Input {...props}/>);
};
export const Level = (props) =>{
  return (<Input {...props}/>);
};
export const Rank = (props) =>{
  return (<Input {...props}/>);
};
