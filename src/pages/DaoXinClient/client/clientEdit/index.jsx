/**
 * 客户管理表编辑页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {clientDetail, clientAdd, clientEdit} from '../clientUrl';
import * as SysField from '../clientField';

const {FormItem} = Form;

const ApiConfig = {
  view: clientDetail,
  add: clientAdd,
  save: clientEdit
};

const ClientEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="clientId"
    >
      <FormItem label="客户名称" name="name" component={SysField.Name} required/>
      <FormItem label="客户地址id" name="adressId" component={SysField.AdressId} required/>
      <FormItem label="联系人id" name="contactsId" component={SysField.ContactsId} required/>
      <FormItem label="固定电话" name="tel" component={SysField.Tel} required/>
      <FormItem label="成立时间" name="setup" component={SysField.Setup} required/>
      <FormItem label="法定代表人" name="legal" component={SysField.Legal} required/>
      <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} required/>
      <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} required/>
      <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} required/>
      <FormItem label="注册地址" name="signIn" component={SysField.SignIn} required/>
      <FormItem label="简介" name="introduction" component={SysField.Introduction} required/>
    </Form>
  );
};
export default ClientEdit;
