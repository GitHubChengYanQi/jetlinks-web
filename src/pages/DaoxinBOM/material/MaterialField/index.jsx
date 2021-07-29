/**
 * 材质字段配置页
 *
 * @author cheng
 * @Date 2021-07-14 15:56:05
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../MaterialUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
