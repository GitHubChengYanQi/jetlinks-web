/**
 * 客户管理表字段配置页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React, {useRef} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Select from '@/components/Select';
import {Button, DatePicker2} from '@alifd/next';
import Drawer from '@/components/Drawer';
import * as apiUrl from '../clientUrl';


export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const AdressId = (props) =>{
  return (<Select api={apiUrl.AdressSelect} {...props}/>);
};
export const ContactsId = (props) =>{
  return (<Select api={apiUrl.ContactsSelect} {...props}/>);
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

                                                              // 联系人详情
export const Contacts = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input {...props}/>
    <Button className='ContactsName' onClick={()=>{
      ref.current.open(false);}}>

    </Button>
    <Drawer width={800} title="详情" component={ContactsList}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
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
