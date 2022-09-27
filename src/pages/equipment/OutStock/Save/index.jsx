import React from 'react';
import {Form} from 'antd';
import AntForm from '@/components/AntForm';
import {outstockAdd, outstockEdit} from '@/pages/equipment/OutStock/url';
import DatePicker from '@/components/DatePicker';
import SelectDevice from '@/pages/equipment/OutStock/Save/components/SelectDevice';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';


const Save = ({success, close, visible,data={}}) => {

  return <AntForm
    apis={{
      add: outstockAdd,
      edit: outstockEdit,
    }}
    title="出库"
    initialValues={data}
    rowKey="outstockId"
    success={success}
    visible={visible}
    close={close}
  >
    <Form.Item
      key="deviceId"
      label="设备MAC"
      initialValue={data?.deviceId}
      name="deviceId"
      rules={[
        {required: true, message: '请选择设备MAC'},
      ]}
    >
      <SelectDevice defaultMac={data?.deviceResult?.mac} disabled={data?.deviceId} />
    </Form.Item>
    <Form.Item
      initialValue={data?.customerId}
      key="customerId"
      label="所属客户"
      name="customerId"
      rules={[
        {required: true, message: '请选择所属客户'},
      ]}
    >
      <SelectCustomer />
    </Form.Item>
    <Form.Item
      initialValue={data?.outstockTime}
      key="outstockTime"
      label="出库时间"
      name="outstockTime"
      rules={[
        {required: true, message: '请选择出库时间'},
      ]}
    >
      <DatePicker placeholder="请选择出库时间" />
    </Form.Item>
  </AntForm>;
};

export default Save;
