import React from 'react';
import Form from 'antd/es/form';
import {Input, Select} from 'antd';
import AntForm from '@/components/AntForm';
import {outstockAdd, outstockEdit} from '@/pages/equipment/OutStock/url';


const Save = ({success, close, visible}) => {


  return (
    <AntForm
      apis={{
        add: outstockAdd,
        edit: outstockEdit,
      }}
      title="出库"
      rowKey="outstockId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        key="mac"
        label="设备MAC"
        name="mac"
        rules={[
          {required: true, message: '请输入设备MAC'},
        ]}
      >
        <Input placeholder="请输入设备MAC"/>
      </Form.Item>
      <Form.Item
        key="customerId"
        label="所属客户"
        name="customerId"
        rules={[
          {required: true, message: '请选择所属客户'},
        ]}
      >
        <Select placeholder="请选择所属客户"/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
