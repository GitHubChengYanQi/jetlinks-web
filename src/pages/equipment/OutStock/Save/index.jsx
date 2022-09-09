import React from 'react';
import AntForm from '@/components/AntForm';
import {outstockAdd, outstockEdit} from '@/pages/equipment/OutStock/url';
import DatePicker from '@/components/DatePicker';
import SelectDevice from '@/pages/equipment/OutStock/Save/components/SelectDevice';


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
        key="deviceId"
        label="设备MAC"
        name="deviceId"
        rules={[
          {required: true, message: '请选择设备MAC'},
        ]}
      >
        <SelectDevice/>
      </Form.Item>
      <Form.Item
        key="outstockTime"
        label="出库时间"
        name="outstockTime"
        rules={[
          {required: true, message: '请选择出库时间'},
        ]}
      >
        <DatePicker placeholder="请选择出库时间"/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
