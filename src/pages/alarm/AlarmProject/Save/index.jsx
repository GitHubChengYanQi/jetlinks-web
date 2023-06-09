import React from 'react';
import {Form, Input, Radio,} from 'antd';
import AntForm from '@/components/AntForm';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';
import {alarmItemEdit} from '@/pages/alarm/AlarmProject/url';
import ContactGroupTransfer from '@/pages/alarm/ContactGroup/components/ContactGroupTransfer';
import {isArray} from '@/util/Tools';

export const getSecond = (value) => {
  const times = (value || '').split(',');
  const day = Number(times[0] || 0);
  const hour = Number(times[1] || 0);
  const min = Number(times[2] || 0);
  return day * 86400 + hour * 3600 + min * 60;
};

const Save = ({
  deviceId,
  modelId,
  data = {},
  success = () => {
  },
  visible = false,
  close = () => {
  }
}) => {
  // console.log(data);
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
        return {
          ...values,
          deviceId,
          itemKey: data.key,
          itemId: data.alarmItemResult?.itemId,
          modelId,
          viewTime: values.timeSpan,
          timeSpan: getSecond(values.timeSpan)
        };
      }}
    >
      <Form.Item
        initialValue={data.title}
        key="title"
        label="报警名称"
        name="title"
        rules={[
          {required: true, message: '报警名称'},
        ]}
      >
        <Input disabled placeholder="报警名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data.alarmItemResult?.reservePlan || data.reservePlan}
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
        initialValue={data.alarmItemResult?.viewTime || data.viewTime || undefined}
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
        initialValue={[...new Set(isArray(data.alarmItemResult?.bindResults).map(item => item.group?.groupId))]}
        key="groupIds"
        name="groupIds"
        label="报警联系人组"
      >
        <ContactGroupTransfer/>
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
