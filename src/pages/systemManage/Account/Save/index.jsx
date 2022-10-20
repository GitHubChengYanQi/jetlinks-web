import React, {useEffect, useState} from 'react';
import {Form, Input, Radio, Space} from 'antd';
import {userAdd, userSave} from '@/Config/ApiUrl/system/user';
import Password from '@/pages/Login/AccountAsk/components/Password';
import AntForm from '@/components/AntForm';
import store from '@/store';
import DatePicker from '@/components/DatePicker';
import RoleIds from '@/pages/systemManage/Role/components/RoleIds';

const Save = (
  {
    visible,
    close = () => {
    },
    data = {},
    success = () => {
    }
  }
) => {

  const [userInfo] = store.useModel('user');

  const currentUser = userInfo.info || {};

  const [newPassword, setNewPassword] = useState();

  const [time, setTime] = useState([]);

  useEffect(() => {
    if (data.beginTime && data.endTime) {
      setTime([data.beginTime, data.endTime]);
    }
  }, [data.userId]);

  return (
    <AntForm
      afterClose={() => {
        setTime([]);
        setNewPassword();
      }}
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
      format={(values) => ({
        ...values,
        roleId: values.roleId.toString(),
        password: data?.userId ? newPassword : values.password,
        beginTime: values.time === '1' ? time[0] : null,
        endTime: values.time === '1' ? time[1] : null,
        customerId: currentUser.customerId,
      })}
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
        <Input placeholder="请输入账号名称" />
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
        <Input placeholder="请输入账号姓名" />
      </Form.Item>
      <Form.Item
        hidden={currentUser.userId === data?.userId}
        initialValue={data?.roleId}
        key="roleId"
        label="选择角色"
        name="roleId"
        rules={[
          {required: true, message: '请选择角色'},
        ]}
      >
        <RoleIds />
      </Form.Item>
      <Form.Item
        initialValue={data?.phone}
        key="phone"
        label="手机号码"
        name="phone"
        rules={[
          {required: true, message: '请输入手机号码'},
          {message: '请输入正确的手机号码!', pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/}
        ]}
      >
        <Input placeholder="请输入手机号码" />
      </Form.Item>
      <Form.Item
        initialValue={data?.email}
        key="email"
        label="电子邮件"
        name="email"
        rules={[
          {
            message: '请输入正确的网址',
            pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$'
          }
        ]}
      >
        <Input placeholder="请输入电子邮件" />
      </Form.Item>
      <Form.Item
        initialValue={data.userId ? '111' : 'opt123'}
        key="password"
        label="账号密码"
        name="password"
        rules={[
          {required: true, message: '请输入密码'},
        ]}
      >
        <Password
          show={data?.userId && !newPassword}
          inputDisabled={data?.userId}
          placeholder="请输入密码"
          content="您确定要重置密码么？重置后默认初始密码为【opt123】"
          initPassword={() => {
            return 'opt123';
          }}
          reset={data?.userId}
          visibilityToggle={!data?.userId}
          onReset={(value) => {
            setNewPassword(value);
          }}
        />
      </Form.Item>
      <Form.Item
        key="time"
        initialValue={data?.beginTime ? '1' : '0'}
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
              <Radio value="1" style={{minWidth: 80}}>时间段</Radio>
              <DatePicker value={time} RangePicker onChange={setTime} />
            </Space>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        initialValue={data?.status || 'ENABLE'}
        key="status"
        label="账号状态"
        name="status"
        rules={[
          {required: true, message: '请选择账号状态'},
        ]}
      >
        <Radio.Group>
          <Radio value="ENABLE">启用</Radio>
          <Radio value="LOCKED">停用</Radio>
        </Radio.Group>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
