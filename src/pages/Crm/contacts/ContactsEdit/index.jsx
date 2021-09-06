/**
 * 联系人表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {contactsDetail, contactsAdd, contactsEdit} from '../contactsUrl';
import * as SysField from '../ContactsField';

const {FormItem} = Form;

const ApiConfig = {
  view: contactsDetail,
  add: contactsAdd,
  save: contactsEdit
};

const ContactsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="contactsId"
    >
      <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName}  required/>
      <FormItem label="职务" name="companyRole" component={SysField.CompanyRole} required/>
      <FormItem label="客户" name="customerId" component={SysField.CustomerId} required/>
    </Form>
  );
};

export default ContactsEdit;
