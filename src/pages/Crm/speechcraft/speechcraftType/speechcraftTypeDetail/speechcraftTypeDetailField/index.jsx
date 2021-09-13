/**
 * 话术分类详细字段配置页
 *
 * @author cheng
 * @Date 2021-09-13 15:24:19
 */

import React, {useEffect} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../speechcraftTypeDetailUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const SpeechcraftTypeId = (props) =>{
  const {speechcraftTypeId} = props;
  if (speechcraftTypeId) {
    props.onChange(speechcraftTypeId);
  }
  return (<Input disabled {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
