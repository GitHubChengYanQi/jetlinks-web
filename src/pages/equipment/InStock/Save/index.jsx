import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Select, Spin} from 'antd';


const Save = props => {

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Modal
      destroyOnClose
      afterClose={() => form.resetFields()}
      title="新增入库"
      open={props.visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => props.close()}
    >
      <Spin spinning={loading}>
        <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 18}}>
          <Form.Item
            key="0"
            label="设备MAC"
            name="id"
            rules={[
              {required: true, message: '请输入设备MAC'},
            ]}
          >
            <Input placeholder="请输入设备MAC"/>
          </Form.Item>
          <Form.Item
            key="1"
            label="物联网卡号"
            name="id"
            rules={[
              {required: true, message: '请输入设备使用的物联网卡号'},
            ]}
          >
            <Input placeholder="请输入设备使用的物联网卡号"/>
          </Form.Item>
          <Form.Item
            key="2"
            label="设备类别"
            name="id"
            rules={[
              {required: true, message: '请选择设备类别'},
            ]}
          >
            <Select options={[]} placeholder="请选择设备类别"/>
          </Form.Item>
          <Form.Item
            key="3"
            label="设备型号"
            name="id"
            rules={[
              {required: true, message: '请选择设备型号'},
            ]}
          >
            <Select options={[]} placeholder="请选择设备型号"/>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
