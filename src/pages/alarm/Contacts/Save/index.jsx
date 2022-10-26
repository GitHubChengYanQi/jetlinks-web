import React from 'react';
import {Form, Input, Radio} from 'antd';
import AntForm from '@/components/AntForm';
import {contactAdd, contactEdit} from '@/pages/alarm/Contacts/url';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';


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
      title="报警联系人"
      initialValues={data}
      rowKey="contactId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data.name}
        key="name"
        label="姓名"
        name="name"
        rules={[
          {required: true, message: '请输入姓名'},
        ]}
      >
        <Input placeholder="请输入姓名"/>
      </Form.Item>
      <Form.Item
        initialValue={data.job}
        key="job"
        name="job"
        label="职务"
        rules={[
          {required: true, message: '请输入职务'},
        ]}
      >
        <Input placeholder="请输入职务"/>
      </Form.Item>
      <Form.Item
        initialValue={data.region}
        key="region"
        name="region"
        label="负责区域"
        rules={[
          {required: true, message: '请输入负责区域'},
        ]}
      >
        <SelectTopClass />
      </Form.Item>
      <Form.Item
        initialValue={data.phone}
        key="phone"
        name="phone"
        label="手机号码"
        rules={[
          {required: true, message: '请输入手机号码'},
          {message: '请输入正确的手机号码!', pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/}
        ]}
      >
        <Input placeholder="请输入手机号码"/>
      </Form.Item>
      <Form.Item
        initialValue={data.shortMessageStatus || '1'}
        key="shortMessageStatus"
        name="shortMessageStatus"
        label="是否短信提醒"
        rules={[
          {required: true, message: '请选择是否短信提醒'},
        ]}
      >
        <Radio.Group>
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        initialValue={data.mail}
        key="mail"
        name="mail"
        label="电子邮件"
      >
        <Input placeholder="请输入电子邮件"/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
