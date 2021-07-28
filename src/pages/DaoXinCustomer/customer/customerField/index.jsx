/**
 * 客户管理表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Select from '@/components/Select';
import {DatePicker2} from '@alifd/next';
import * as apiUrl from '@/pages/DaoXinCustomer/customer/customerUrl';

const w = 200;


export const Name = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
export const ClientName = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
export const AdressId = (props) =>{
  return (<InputNumber style={{width:w}} {...props}/>);
};
export const ContactsId = (props) =>{
  return (<InputNumber style={{width:w}} {...props}/>);
};

export const Setup = (props) =>{
  return (<DatePicker2 style={{width:w}} showTime {...props}/>);
};
export const Legal = (props) =>{
  return (<Input  style={{width:w}} {...props}/>);
};
export const Utscc = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const CompanyType = (props) =>{
  return (<AntdSelect showSearch  style={{width:w}}  filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:'yxzr1',label:'有限责任公司（自然人独资）'},{value:'yxzr2',label:'有限责任公司（自然人投资或控股）'},{value:'gfyx',label:'股份有限公司'},{value:'yxhh',label:'有限合伙企业'},{value:'wsdz',label:'外商独资企业'},{value:'grdz',label:'个人独资企业'},{value:'gydz',label:'国有独资公司'},{value:'others',label:'其他类型'}]} {...props}/>);
};
export const BusinessTerm = (props) =>{
  return (<Input.TextArea style={{width:w}}  {...props}/>);
};
export const SignIn = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Introduction = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};

export const Location = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Longitude = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Latitude = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const ClientId = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.clientIdSelect} {...props}/>);
};

export const client = (props) =>{
  return (<Input style={{width:w}}  {...props} />);
};
export const ContactsName = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Job = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Phone = (props) =>{
  return (<InputNumber  style={{width:w}}  {...props}/>);
};
export const Dept = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Client = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.clientIdSelect} {...props}/>);
};


