/**
 * 编辑页
 *
 * @author cheng
 * @Date 2021-08-12 08:47:13
 */

import React, {useImperativeHandle, useRef} from 'react';
import {Input, message} from 'antd';
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

const formActionsPublic = createFormActions();

const PhoneEdit = ({...props}, ref) => {

  const {contactsId,NoButton, ...other} = props;
  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  return <div style={{padding: 24}}>
    <Form
      {...other}
      onSuccess={(res) => {
        other.onSuccess(res.data);
      }}
      formActions={formActionsPublic}
      ref={formRef}
      NoButton={NoButton}
      api={ApiConfig}
      onSubmit={(value) => {
        if (!contactsId) {
          message.warn('请选择联系人！');
          return false;
        }
        return {...value, contactsId};
      }}
      fieldKey="phoneId"
    >
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

export default React.forwardRef(PhoneEdit);
