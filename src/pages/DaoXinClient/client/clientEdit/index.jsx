/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {clientDetail, clientAdd, clientEdit} from '../clientUrl';
import * as SysField from '../clientField';
import ContactsList from '@/pages/DaoXinClient/client/clientEdit/client';

const {FormItem} = Form;

const ApiConfig = {
  view: clientDetail,
  add: clientAdd,
  save: clientEdit
};

const ClientEdit = ({...props}) => {

  const {value} = {...props};

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="clientId"
    >
      <FormItem label="客户名称" name="clientName" component={SysField.ClientName} required/>
      <FormItem label="客户地址id" name="adressId" component={SysField.AdressId} required/>
      <FormItem label="成立时间" name="setup" component={SysField.Setup} required/>
      <FormItem label="法定代表人" name="legal" component={SysField.Legal} required/>
      <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} required/>
      <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} required/>
      <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} required/>
      <FormItem label="注册地址" name="signIn" component={SysField.SignIn} required/>
      <FormItem label="简介" name="introduction" component={SysField.Introduction} required/>
      <ContactsList clientId={value}/>
    </Form>
  );
};

export default ClientEdit;
