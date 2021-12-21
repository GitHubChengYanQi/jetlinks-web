/**
 * 供应商开票编辑页
 *
 * @author song
 * @Date 2021-12-20 11:29:00
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {invoiceDetail, invoiceAdd, invoiceEdit} from '../invoiceUrl';
import * as SysField from '../invoiceField';

const {FormItem} = Form;

const ApiConfig = {
  view: invoiceDetail,
  add: invoiceAdd,
  save: invoiceEdit
};

const InvoiceEdit = ({...props}) => {

  const {customerId,...other} = props;

  const formRef = useRef();

  return (
    <Form
      {...other}
      ref={formRef}
      api={ApiConfig}
      fieldKey="invoiceId"
      onSubmit={(value)=>{
        return {...value,customerId};
      }}
    >
      <FormItem label="开户行名称" name="bank" component={SysField.Bank} required/>
      <FormItem label="开户行账号" name="bankAccount" component={SysField.BankAccount} required/>
      <FormItem label="统一社会信用代码" name="creditCode" component={SysField.CreditCode} required/>
      <FormItem label="邮箱" name="email" component={SysField.Email} required/>
      <FormItem label="是否默认" name="isDefault" value={0} component={SysField.IsDefault} required/>
    </Form>
  );
};

export default InvoiceEdit;
