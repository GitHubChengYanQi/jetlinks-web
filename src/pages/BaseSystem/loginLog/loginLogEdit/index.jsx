import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {loginLogDetail, loginLogAdd, loginLogEdit} from '../loginLogUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: loginLogDetail,
  add: loginLogAdd,
  save: loginLogEdit
};

const LoginLogEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="loginLogId"
    >
      <FormItem label="日志名称" name="logName" component={Input} required/>
      <FormItem label="管理员id" name="userId" component={Input} required/>
      <FormItem label="是否执行成功" name="succeed" component={Input} required/>
      <FormItem label="具体消息" name="message" component={Input} required/>
      <FormItem label="登录ip" name="ipAddress" component={Input} required/>
    </Form>
  );
};

export default LoginLogEdit;
