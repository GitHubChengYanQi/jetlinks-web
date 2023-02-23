import React from 'react';
import {Form, Input, Radio,} from 'antd';
import moment from 'moment';
import AntForm from '@/components/AntForm';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';
import {alarmItemEdit} from '@/pages/alarm/AlarmProject/url';
import ContactGroupTransfer from '@/pages/alarm/ContactGroup/components/ContactGroupTransfer';
import {isArray} from '@/util/Tools';

export const getSecond = (value) => {
  const time = moment(value).format('HH 天 mm 小时 ss 分钟');
  const day = Number(time.substring(0, 2));
  const hour = Number(time.substring(5, 7));
  const min = Number(time.substring(11, 13));
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
  // console.log(data);
  return (
    <AntForm
      width={800}
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
          itemKey: data.key,
          itemId: data.alarmItemResult?.itemId,
          modelId,
          viewTime: moment(values.timeSpan).format('YYYY-MM-DD HH:mm:ss'),
          timeSpan: getSecond(values.timeSpan)
        };
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
        initialValue={data.alarmItemResult?.viewTime || undefined}
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
        <ContactGroupTransfer />
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
