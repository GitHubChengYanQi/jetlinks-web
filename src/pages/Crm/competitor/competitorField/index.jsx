/**
 * 竞争对手管理字段配置页
 *
 * @author
 * @Date 2021-09-06 13:44:14
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../competitorUrl';
import {BusinessIdList} from '../competitorUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Nature = (props) =>{
  return (<Input {...props}/>);
};
export const BusinessId = (props) =>{
  const {businessId} = props;
  if (businessId){
    props.onChange(businessId);
  }
  return (<Select api={apiUrl.BusinessIdList} {...props}/>);
};
