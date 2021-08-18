/**
 * 分类导航字段配置页
 *
 * @author siqiang
 * @Date 2021-08-18 16:13:41
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../daoxinPortalClassUrl';

export const ClassName = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};
export const ClassificationId = (props) =>{
  return (<Select api={apiUrl.classificationIdSelect} {...props}/>);
};
