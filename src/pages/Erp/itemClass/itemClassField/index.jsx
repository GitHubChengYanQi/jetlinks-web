/**
 * 产品分类表字段配置页
 *
 * @author cheng
 * @Date 2021-08-11 15:37:57
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../itemClassUrl';

export const ClassName = (props) =>{
  return (<Input {...props}/>);
};
