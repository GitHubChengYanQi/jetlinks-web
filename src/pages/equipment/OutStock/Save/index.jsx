import React from 'react';
import {Form} from 'antd';
import AntForm from '@/components/AntForm';
import {outstockAdd, outstockEdit,} from '@/pages/equipment/OutStock/url';
import DatePicker from '@/components/DatePicker';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';
import InputNumber from '@/components/InputNumber';
import {isArray} from '@/util/Tools';


const Save = ({success, close, visible}) => {
  console.log(visible);
  return <AntForm
    apis={{
      add: outstockAdd,
      edit: outstockEdit,
    }}
    title="出库"
    rowKey="outstockId"
    success={success}
    visible={visible}
    close={close}
    format={(values) => {

      return {
        customerId: values.customerId,
        params: isArray(visible).map(item => ({
          deviceId: item.deviceId,
          warranty: values.warranty,
          outstockTime: values.outstockTime,
        }))
      };
    }}
  >
    <Form.Item
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
      key="warranty"
      label="质保时长"
      name="warranty"
      rules={[
        {required: true, message: '请输入质保时长'},
      ]}
    >
      <InputNumber addonAfter="月" placeholder="请输入质保时长" />
    </Form.Item>
    <Form.Item
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
