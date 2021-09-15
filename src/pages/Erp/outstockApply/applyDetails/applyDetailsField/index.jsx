/**
 * 字段配置页
 *
 * @author song
 * @Date 2021-09-15 09:42:47
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../applyDetailsUrl';

export const ItemId = (props) =>{
  return (<Input {...props}/>);
};
export const BrandId = (props) =>{
  return (<Input {...props}/>);
};
export const OutstockApplyId = (props) =>{
  return (<Input {...props}/>);
};
