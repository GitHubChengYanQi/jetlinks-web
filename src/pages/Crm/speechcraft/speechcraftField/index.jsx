/**
 * 话术基础资料字段配置页
 *
 * @author
 * @Date 2021-09-11 13:27:08
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../speechcraftUrl';
import {speechcraftTypeDetail} from '../speechcraftUrl';

export const SpeechcraftTitle = (props) =>{
  return (<Input {...props}/>);
};
export const SpeechcraftDetails = (props) =>{
  return (<Input {...props}/>);
};
export const SpeechcraftKey = (props) =>{
  return (<Input {...props}/>);
};
export const SpeechcraftType = (props) =>{
  return (<Select api={apiUrl.speechcraftType} {...props}/>);
};
