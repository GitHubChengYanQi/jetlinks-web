import React from 'react';
import {Form, Input, Select} from 'antd';
import {roleAdd, roleSave} from '@/Config/ApiUrl/system/role';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';
import AntForm from '@/components/AntForm';


const Save = ({
  visible,
  close = () => {
  },
  data = {},
  success = () => {
  }
}) => {

  return (
    <AntForm
      apis={{
        add: roleAdd,
        edit: roleSave,
      }}
      headerTitle="数据转发"
      initialValues={data || {}}
      rowKey="roleId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data?.name}
        key="address"
        label="数据转发地址"
        name="address"
        rules={[
          {required: true, message: '请输入数据转发地址'},
        ]}
      >
        <Input placeholder="请输入数据转发地址"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="对接通信协议"
        name="name"
        rules={[
          {required: true, message: '请选择对接通信协议'},
        ]}
      >
        <Select placeholder="请选择对接通信协议"/>
      </Form.Item>
      <Form.Item
        key="group"
        label="选择分组权限"
        name="group"
        rules={[
          {required: false, message: '请选择分组权限'},
        ]}
      >
        <SelectTopClass/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
