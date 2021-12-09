/**
 * 合同分类字段配置页
 *
 * @author song
 * @Date 2021-12-09 14:11:38
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../contractClassUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
