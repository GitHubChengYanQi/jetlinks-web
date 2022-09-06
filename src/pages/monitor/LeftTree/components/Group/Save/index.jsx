import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Spin} from 'antd';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';

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
      width={800}
      title={`${props.data.id ? '编辑' : '新建'}客户`}
      open={props.visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => props.close()}
    >
      <Spin spinning={loading}>
        <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
          <Form.Item
            initialValue={props.data.id}
            key="id"
            label="客户名称"
            name='id'
            rules={[
              {required: true, message: '请输入客户名称'},
            ]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>
          <Form.Item
            key="name"
            name='name'
            label="选择上级客户"
            rules={[
              {required: true, message: '请选择上级客户'},
            ]}
          >
            <SelectTopClass />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
