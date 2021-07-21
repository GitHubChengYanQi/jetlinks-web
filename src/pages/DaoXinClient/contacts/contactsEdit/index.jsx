/**
 * 联系人表编辑页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
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
      fieldKey="id"
    >
      <FormItem label="联系人编号" name="contactsId" component={SysField.ContactsId} required/>
      <FormItem label="联系人姓名" name="name" component={SysField.Name} required/>
      <FormItem label="职务" name="job" component={SysField.Job} required/>
      <FormItem label="联系电话" name="phone" component={SysField.Phone} required/>
    </Form>
  );
};

export default ContactsEdit;
