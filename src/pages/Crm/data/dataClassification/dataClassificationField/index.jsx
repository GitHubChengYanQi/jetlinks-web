/**
 * 资料分类表字段配置页
 *
 * @author 
 * @Date 2021-09-13 12:51:21
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../dataClassificationUrl';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
