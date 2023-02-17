import React, {useEffect, useState} from 'react';
import {Form, Input, Radio, TimePicker,} from 'antd';
import AntForm from '@/components/AntForm';
import {contactAdd, contactEdit} from '@/pages/alarm/Contacts/url';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';
import store from '@/store';
import RoleIds from '@/pages/systemManage/Role/components/RoleIds';
import {Total} from '@/pages/alarm/Contacts/Save/components/Total';
import Select from '@/components/Select';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';


const Save = ({
  data = {},
  success = () => {
  },
  visible = false,
  close = () => {
  }
}) => {

  return (
    <AntForm
      apis={{
        add: contactAdd,
        edit: contactEdit,
      }}
      headerTitle="报警项编辑"
      initialValues={data}
      rowKey="contactId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data.name}
        key="name"
        label="报警通知预案"
        name="name"
        rules={[
          {required: true, message: '请输入姓名'},
        ]}
      >
        <Input.TextArea placeholder="请输入姓名"/>
      </Form.Item>
      <Form.Item
        initialValue={data.job}
        key="job"
        name="job"
        label="报警时间间隔"
        rules={[
          {required: true, message: '请输入职务'},
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
          {required: true, message: '请输入手机号码'},
        ]}
      >
        <Select placeholder="请输入手机号码"/>
      </Form.Item>
      <Form.Item
        initialValue={data.shortMessageStatus || '1'}
        key="shortMessageStatus"
        name="shortMessageStatus"
        label="报警项状态"
        rules={[
          {required: true, message: '请选择是否短信提醒'},
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
