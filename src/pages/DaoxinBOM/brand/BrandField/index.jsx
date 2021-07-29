/**
 * 品牌表字段配置页
 *
 * @author
 * @Date 2021-07-14 14:19:04
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../BrandUrl';

export const BrandName = (props) =>{
  return (<Input {...props}/>);
};
