/**
 * 导航分类字段配置页
 *
 * @author 
 * @Date 2021-08-18 10:38:50
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../navigationDifferenceUrl';

export const Difference = (props) =>{
  return (<Input {...props}/>);
};
