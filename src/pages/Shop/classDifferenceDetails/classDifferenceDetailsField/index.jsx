/**
 * 分类明细内容字段配置页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:52
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../classDifferenceDetailsUrl';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<Input {...props}/>);
};
export const Link = (props) =>{
  return (<Input {...props}/>);
};
