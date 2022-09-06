import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Radio, Spin} from 'antd';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';

const Save = props => {

  const {success} = props;

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {

    });
  };

  return (
    <Modal
      destroyOnClose
      afterClose={() => {
        form.resetFields();
      }}
      width={800}
      title={`${props.data.id ? '编辑' : '新建'}分组`}
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
            initialValue={props.data.name}
            key="name"
            label="分组名称"
            name='name'
            rules={[
              {required: true, message: '请输入客户名称'},
            ]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>
          <Form.Item
            key="parentId"
            name='parentId'
            label="选择上级分组"
          >
            <SelectTopClass />
          </Form.Item>
          <Form.Item
            initialValue='0'
            key="status"
            name='status'
            label="分组状态"
            rules={[
              {required: true},
            ]}
          >
            <Radio.Group>
              <Radio value='0'>启用</Radio>
              <Radio value='1'>停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
