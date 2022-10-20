import React from 'react';
import {Input, Form} from 'antd';
import {updateDeviceRemark} from '@/pages/equipment/Equipment/url';
import AntForm from '@/components/AntForm';


const NoteSave = ({
  data = {},
  success = () => {
  },
  close = () => {
  },
}) => {

  return (
    <AntForm
      apis={{
        edit: updateDeviceRemark,
      }}
      title="终端备注"
      initialValues={data}
      rowKey="deviceId"
      success={success}
      visible={data.deviceId}
      close={close}
    >
      <Form.Item
        initialValue={data.remarks}
        key="remarks"
        label="终端备注"
        name="remarks"
        rules={[
          {required: true, message: '请输入终端备注'},
        ]}
      >
        <Input placeholder="请输入终端备注" />
      </Form.Item>
    </AntForm>
  );
};

export default NoteSave;
