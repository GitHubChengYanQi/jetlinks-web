/**
 * 套餐分表字段配置页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../erpPackageTableUrl';

export const PackageId = (props) =>{
  return (<Input {...props}/>);
};
export const Package = (props) =>{
  return (<Input {...props}/>);
};
