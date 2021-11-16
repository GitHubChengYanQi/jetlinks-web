/**
 * 质检任务字段配置页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../qualityTaskUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import {userIdSelect} from '@/pages/Portal/remind/remindUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {brandIdSelect} from '@/pages/Erp/instock/InstockUrl';
import {qualityPlanList, qualityPlanListSelect} from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanUrl';

export const Time = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Select api={userIdSelect} {...props}/>);
};
export const Remark = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber {...props}/>);
};

export const BrandId = (props) =>{
  return (<Select   api={brandIdSelect} {...props}/>);
};

export const QualityPlanId = (props) =>{
  return (<Select api={qualityPlanListSelect} {...props}/>);
};

export const Type = (props) =>{
  return (<AntdSelect options={[{label:'入厂',value:'入厂'},{label:'出厂',value:'出厂'},]} {...props}/>);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};

export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};
