import React from 'react';
import {Form, message, Modal} from 'antd';
import AntForm from '@/components/AntForm';
import {outstockAdd, outstockEdit, outstockUnbind} from '@/pages/equipment/OutStock/url';
import DatePicker from '@/components/DatePicker';
import SelectDevice from '@/pages/equipment/OutStock/Save/components/SelectDevice';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';
import {useRequest} from '@/util/Request';


const Save = ({success, close, visible, data = {}}) => {

  const {loading, run} = useRequest(outstockUnbind, {
    manual: true,
    onSuccess: () => {
      message.success('解绑成功！');
    }
  });

  const [form] = Form.useForm();

  return <AntForm
    form={form}
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
    errorHandle={() => {
      Modal.confirm({
        content: '设备已出库，确定解绑吗?',
        onOk: () => run({data: {deviceIds:[form.getFieldValue('deviceId')]}})
      });
    }}
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
      <SelectDevice disabled={data?.deviceId}/>
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
      <SelectCustomer/>
    </Form.Item>
    <Form.Item
      initialValue={data?.outstockTime || new Date()}
      key="outstockTime"
      label="出库时间"
      name="outstockTime"
      rules={[
        {required: true, message: '请选择出库时间'},
      ]}
    >
      <DatePicker placeholder="请选择出库时间"/>
    </Form.Item>
  </AntForm>;
};

export default Save;
