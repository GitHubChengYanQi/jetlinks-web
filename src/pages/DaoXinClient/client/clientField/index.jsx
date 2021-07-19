/**
 * 客户管理表字段配置页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import {DatePicker2} from '@alifd/next';
import * as apiUrl from '../clientUrl';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const AdressId = (props) =>{
  return (<Input {...props}/>);
};
export const ContactsId = (props) =>{
  return (<Input {...props}/>);
};
export const Tel = (props) =>{
  return (<Input {...props}/>);
};
export const Setup = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const Legal = (props) =>{
  return (<Input {...props}/>);
};
export const Utscc = (props) =>{
  return (<Input {...props}/>);
};
export const CompanyType = (props) =>{
  return ( <AntdSelect  options={[
    {label:'有限责任公司（自然人独资）',value:'有限责任公司（自然人独资）' } ,
    {label:'有限责任公司（自然人投资或控股）',value:'有限责任公司（自然人投资或控股）'} ,
    {label:'股份有限公司',value:'股份有限公司'} ,
    {label:'有限合伙企业',value:'有限合伙企业'} ,
    {label:'外商独资企业',value:'外商独资企业'} ,
    {label:'个人独资企业',value:'个人独资企业'} ,
    {label:'国有独资公司',value:'国有独资公司'} ,
    {label:'其他类型',value:'其他类型'}]}

                      {...props}/>);
};
export const BusinessTerm = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const SignIn = (props) =>{
  return (<Input {...props}/>);
};
export const Introduction = (props) =>{
  return (<Input {...props}/>);
};
