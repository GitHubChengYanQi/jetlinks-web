import React from 'react';
import {Form, Input, Radio,} from 'antd';
import AntForm from '@/components/AntForm';
import Select from '@/components/Select';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';
import {alarmItemEdit} from '@/pages/alarm/AlarmProject/url';

export const getSecond = (value) => {
  const day = Number(value.substring(0, 2));
  const hour = Number(value.substring(5, 7));
  const min = Number(value.substring(11, 13));
  return day * 86400 + hour * 3600 + min * 60;
};

const Save = ({
  modelId,
  data = {},
  success = () => {
  },
  visible = false,
  close = () => {
  }
}) => {
  console.log(data);
  return (
    <AntForm
      apis={{
        add: alarmItemEdit,
        edit: alarmItemEdit,
      }}
      headerTitle="报警项编辑"
      initialValues={data}
      rowKey="alarmId"
      success={success}
      visible={visible}
      close={close}
      format={(values) => {
        return {...values, itemKey: data.key, modelId, timeSpan: getSecond(values.timeSpan)};
      }}
    >
      <Form.Item
        initialValue={data.reservePlan}
        key="reservePlan"
        label="报警通知预案"
        name="reservePlan"
        rules={[
          {required: true, message: '请输入报警通知预案'},
        ]}
      >
        <Input.TextArea placeholder="请输入报警通知预案"/>
      </Form.Item>
      <Form.Item
        initialValue={data.timeSpan}
        key="timeSpan"
        name="timeSpan"
        label="报警时间间隔"
        rules={[
          {required: true, message: '请选择报警时间间隔'},
        ]}
      >
        <AlarmTime/>
      </Form.Item>
      <Form.Item
        initialValue={data.phone}
        key="phone"
        name="phone"
        label="报警联系人组"
        rules={[
          // {required: true, message: '请输入手机号码'},
        ]}
      >
        <Select placeholder="请输入手机号码"/>
      </Form.Item>
      <Form.Item
        initialValue={typeof data.status === 'number' ? data.status : 1}
        key="status"
        name="status"
        label="报警项状态"
        rules={[
          {required: true, message: '请选择报警项状态'},
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
