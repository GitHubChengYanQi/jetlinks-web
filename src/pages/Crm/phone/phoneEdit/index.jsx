/**
 * 编辑页
 *
 * @author cheng
 * @Date 2021-08-12 08:47:13
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {phoneDetail, phoneAdd, phoneEdit} from '../phoneUrl';
import * as SysField from '../phoneField';

const {FormItem} = Form;

const ApiConfig = {
  view: phoneDetail,
  add: phoneAdd,
  save: phoneEdit
};

const PhoneEdit = ({...props}) => {

  const {contactsId} = props;
  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="phoneId"
    >
      <FormItem hidden name="contactsId" component={SysField.ContactsId} value={contactsId} required/>
      <FormItem label="电话号码" name="phoneNumber" component={SysField.PhoneNumber} required/>
    </Form>
  );
};

export default PhoneEdit;
