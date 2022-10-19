import React from 'react';
import {Form, Input, message} from 'antd';
import AntForm from '@/components/AntForm';
import {changePwd, userAdd, userSave} from '@/Config/ApiUrl/system/user';
import store from '@/store';


const Save = ({
  visible,
  close = () => {
  },
  data = {},
  success = () => {
  }
}) => {


  const [userInfo] = store.useModel('user');

  const info = userInfo.info || {};

  return (
    <AntForm
      apis={{
        add: changePwd,
      }}
      headerTitle="账号设置"
      initialValues={data || {}}
      success={close}
      visible={visible}
      close={close}
      format={(values) => {
        if (values.passWord !== values.newPassWord) {
          message.warn('两次密码输入不一致！');
          return false;
        }
        return values;
      }}
    >
      <Form.Item
        initialValue={info?.account}
        key="account"
        label="账号名称"
        name="account"
      >
        <Input disabled placeholder="请输入账号名称"/>
      </Form.Item>
      <Form.Item
        initialValue={info?.phone}
        key="phone"
        label="手机号码"
        name="phone"
      >
        <Input disabled placeholder="请输入手机号码"/>
      </Form.Item>
      <Form.Item
        initialValue={info?.email}
        key="email"
        label="电子邮箱"
        name="email"
      >
        <Input disabled placeholder="请输入电子邮箱"/>
      </Form.Item>
      <Form.Item
        key="oldPassWord"
        label="验证原密码"
        name="oldPassWord"
        rules={[
          {required: true, message: '请输入原密码'},
        ]}
      >
        <Input placeholder="请输入请输入原密码"/>
      </Form.Item>
      <Form.Item
        key="passWord"
        label="设置新密码"
        name="passWord"
        rules={[
          {required: true, message: '请输入新密码'},
        ]}
      >
        <Input.Password placeholder="请输入新密码"/>
      </Form.Item>
      <Form.Item
        key="newPassWord"
        label="确认新密码"
        name="newPassWord"
        rules={[
          {required: true, message: '请确认新密码'},
        ]}
      >
        <Input.Password placeholder="请确认新密码"/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
