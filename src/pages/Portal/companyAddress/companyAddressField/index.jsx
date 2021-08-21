/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:16:16
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Select from '@/components/Select';
import {CustomerIdListSelect} from '@/pages/Portal/companyAddress/companyAddressUrl';
import UpLoadImg from '@/components/Upload';

export const RepairId = (props) =>{
  props.onChange(props.result);
  return (<Input {...props}/>);
};
export const Identify = (props) =>{
  props.onChange(props.result);
  return (<Input {...props}/>);
};
export const CustomerId = (props) =>{
  return (<Select api={CustomerIdListSelect} {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const Province = (props) =>{
  return (<Input {...props}/>);
};
export const City = (props) =>{
  return (<Input {...props}/>);
};
export const Area = (props) =>{
  return (<Input {...props}/>);
};
export const Address = (props) =>{
  return (<Input {...props}/>);
};
export const People = (props) =>{
  return (<Input {...props}/>);
};
export const Position = (props) =>{
  return (<Input {...props}/>);
};
export const Telephone = (props) =>{
  return (<Input {...props}/>);
};
