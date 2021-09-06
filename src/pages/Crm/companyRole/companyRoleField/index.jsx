/**
 * 公司角色表字段配置页
 *
 * @author 
 * @Date 2021-09-06 11:29:56
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../companyRoleUrl';

export const Position = (props) =>{
  return (<Input {...props}/>);
};
