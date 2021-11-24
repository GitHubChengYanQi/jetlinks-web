/**
 * 流程主表字段配置页
 *
 * @author c
 * @Date 2021-11-19 10:58:01
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../processUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';

export const ProcessName = (props) =>{
  return (<Input {...props}/>);
};
export const CategoryId = (props) =>{
  return (<Input {...props}/>);
};
export const Type = (props) =>{
  return (<AntdSelect options={[{label:'工艺',value:'ship'},{label:'审核',value:'audit'}]} {...props}/>);
};
export const FormId = (props) =>{
  return (<Input {...props}/>);
};

export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};

