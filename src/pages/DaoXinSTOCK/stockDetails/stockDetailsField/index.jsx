/**
 * 仓库物品明细表字段配置页
 *
 * @author 
 * @Date 2021-07-15 11:13:02
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../stockDetailsUrl';

export const StockId = (props) =>{
  return (<Select api={apiUrl.stockIdSelect} {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const StorageTime = (props) =>{
  return (<Input {...props}/>);
};
