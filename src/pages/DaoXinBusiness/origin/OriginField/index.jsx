/**
 * 来源表字段配置页
 *
 * @author
 * @Date 2021-07-19 17:59:08
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../OriginUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
