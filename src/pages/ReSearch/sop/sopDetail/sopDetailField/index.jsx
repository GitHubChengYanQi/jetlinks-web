/**
 * sop详情字段配置页
 *
 * @author song
 * @Date 2022-02-10 09:21:35
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../sopDetailUrl';

export const SopId = (props) =>{
  return (<Input {...props}/>);
};
export const StepName = (props) =>{
  return (<Input {...props}/>);
};
export const Img = (props) =>{
  return (<Input {...props}/>);
};
export const Instructions = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
