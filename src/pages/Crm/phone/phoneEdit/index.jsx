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
import {createFormActions} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: phoneDetail,
  add: phoneAdd,
  save: phoneEdit
};

const PhoneEdit = ({...props}) => {

  const {contactsId,...other} = props;
  const formRef = useRef();

  const formActionsPublic = createFormActions();

  return <div style={{padding: 24}}>
    <Form
      {...other}
      onSuccess={(res)=>{
        other.onSuccess(res.data.phoneId);
      }}
      formActions={formActionsPublic}
      ref={formRef}
      api={ApiConfig}
      fieldKey="phoneId"
    >
      <FormItem label="联系人" name="contactsId" component={SysField.ContactsId} value={contactsId || null} required />
      <FormItem
        label="电话号码"
        name="phoneNumber"
        component={SysField.PhoneNumber}
        rules={[{
          required: true,
          message: '请输入正确的手机号码!',
          pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        }]} />
    </Form>
  </div>;
};

export default PhoneEdit;
