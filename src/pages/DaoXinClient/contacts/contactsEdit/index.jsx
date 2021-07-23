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
import * as SysField from '../contactsField';

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
      <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName} required/>
      <FormItem label="职务" name="job" component={SysField.Job} required/>
      <FormItem label="联系电话" name="phone" component={SysField.Phone} required/>
      <FormItem label="部门编号" name="deptId" component={SysField.DeptId} required/>
      <FormItem label="客户id" name="clientId" component={SysField.ClientId} required/>
    </Form>
  );
};

export default ContactsEdit;
