import React from 'react';
import {Input, Radio,Form} from 'antd';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';
import AntForm from '@/components/AntForm';
import {deviceClassifyAdd, deviceClassifyEdit} from '@/pages/equipment/Grouping/url';

const Save = props => {

  const {success, visible, data = {}, close} = props;

  return (
    <AntForm
      apis={{
        add: deviceClassifyAdd,
        edit: deviceClassifyEdit,
      }}
      title="分组"
      initialValues={data}
      rowKey="deviceId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="分组名称"
        name="name"
        rules={[
          {required: true, message: '请输入客户名称'},
        ]}
      >
        <Input placeholder="请输入客户名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.pid}
        key="pid"
        name="pid"
        label="选择上级分组"
      >
        <SelectTopClass/>
      </Form.Item>
      <Form.Item
        initialValue={data?.status || '1'}
        key="status"
        name="status"
        label="分组状态"
        rules={[
          {required: true},
        ]}
      >
        <Radio.Group>
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </Radio.Group>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
