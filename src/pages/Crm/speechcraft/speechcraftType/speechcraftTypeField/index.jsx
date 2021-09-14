/**
 * 话术分类字段配置页
 *
 * @author 
 * @Date 2021-09-13 13:00:15
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../speechcraftTypeUrl';

export const SpeechcraftTypeSort = (props) =>{
  return (<Input {...props}/>);
};
export const SpeechcraftTypeName = (props) =>{
  return (<Input {...props}/>);
};
