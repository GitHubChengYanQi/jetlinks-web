import React from 'react';
import {Form, DatePicker, Input, Radio, Space} from 'antd';
import Select from '@/components/Select';
import {userAdd, userSave} from '@/Config/ApiUrl/system/user';
import {roleListSelect} from '@/Config/ApiUrl/system/role';
import Password from '@/pages/Login/AccountAsk/components/Password';
import AntForm from '@/components/AntForm';

const RangePicker = DatePicker.RangePicker;

const Save = (
  {
    visible,
    close = () => {
    },
    data,
    success = () => {
    }
  }
) => {


  return (
    <AntForm
      apis={{
        add: userAdd,
        edit: userSave,
      }}
      title="账号"
      initialValues={data}
      rowKey="userId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data?.account}
        key="account"
        label="账号名称"
        name="account"
        rules={[
          {required: true, message: '请输入账号名称'},
        ]}
      >
        <Input placeholder="请输入账号名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="账号姓名"
        name="name"
        rules={[
          {required: true, message: '请输入账号姓名'},
        ]}
      >
        <Input placeholder="请输入账号姓名"/>
      </Form.Item>
      <Form.Item
        initialValue={`${data?.roleId || ''}`}
        key="roleId"
        label="选择角色"
        name="roleId"
        rules={[
          {required: true, message: '请选择角色'},
        ]}
      >
        <Select format={(data = []) => {
          return data.map(item => ({label: item.name, value: `${item.role_id}`}));
        }} api={roleListSelect} placeholder="请选择角色"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.phone}
        key="phone"
        label="手机号码"
        name="phone"
        rules={[
          {required: true, message: '请输入手机号码'},
        ]}
      >
        <Input placeholder="请输入手机号码"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.email}
        key="email"
        label="电子邮件"
        name="email"
      >
        <Input placeholder="请输入电子邮件"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.password || (data.userId ? '111111' : null)}
        key="password"
        label="账号密码"
        name="password"
        rules={[
          {required: true, message: '请输入密码'},
        ]}
      >
        <Password
          inputDisabled={data?.userId}
          placeholder="请输入密码"
          reset={data?.userId}
          visibilityToggle={!data?.userId}
        />
      </Form.Item>
      <Form.Item
        key="time"
        label="账号有效期"
        name="time"
        rules={[
          {required: false, message: '请选择账号有效期'},
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="0">永久</Radio>
            <Space>
              <Radio value="1">时间段</Radio>
              <RangePicker/>
            </Space>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        initialValue={1}
        key="status"
        label="账号状态"
        name="status"
        rules={[
          {required: true, message: '请选择账号状态'},
        ]}
      >
        <Radio.Group>
          <Radio value={1}>启用</Radio>
          <Radio value={0}>停用</Radio>
        </Radio.Group>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
