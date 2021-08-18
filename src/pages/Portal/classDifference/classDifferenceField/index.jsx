/**
 * 分类明细字段配置页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:33
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../classDifferenceUrl';

export const Title = (props) =>{
  return (<Input {...props}/>);
};
