/**
 * 仓库库位表字段配置页
 *
 * @author song
 * @Date 2021-10-29 09:22:25
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../storehousePositionsUrl';

export const StorehouseId = (props) =>{
  return (<Input {...props}/>);
};
export const SkuId = (props) =>{
  return (<Input {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Number = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const Note = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const Pid = (props) =>{
  const {stroehouseId,...other} = props;

  return (<Cascader api={apiUrl.storehousePositionsTreeView} top defaultParams={{params:{ids:stroehouseId}}} {...other}/>);
};
