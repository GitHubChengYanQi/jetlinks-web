/**
 * 售后动态表字段配置页
 *
 * @author 
 * @Date 2021-08-24 08:51:32
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../repairDynamicUrl';

export const StockItemId = (props) =>{
  return (<Input {...props}/>);
};
export const Content = (props) =>{
  return (<Input {...props}/>);
};
