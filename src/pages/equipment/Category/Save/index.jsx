import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Radio, Spin} from 'antd';
import SelectTopClass from '@/pages/equipment/Category/Save/components/SelectTopClass';

const Save = props => {

  const {close, visible, data, status, success} = props;

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {
      if (data.id) {

      }

    });
  };

  return (
    <Modal
      afterClose={() => form.resetFields()}
      destroyOnClose
      width={800}
      title={`${data.id ? '编辑' : '新建'}设备类别`}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => close()}
    >
      <Spin spinning={loading}>
        <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
          <Form.Item
            initialValue={data.name}
            key="name"
            label="设备类别名称"
            name='name'
            rules={[
              {required: true, message: '请输入设备类别名称'},
            ]}
          >
            <Input placeholder="请输入设备类别名称" />
          </Form.Item>
          {status && <Form.Item
            initialValue={data.parentId}
            key="parentId"
            name='parentId'
            label="选择上级类别"
            rules={[
              {required: true, message: '请选择上级类别'},
            ]}
          >
            <SelectTopClass />
          </Form.Item>}
          {!status && <Form.Item
            initialValue='0'
            key="1"
            label="类别状态"
            name='id'
            rules={[
              {required: true, message: '请选择类别状态'},
            ]}
          >
            <Radio.Group>
              <Radio value='0'>启用</Radio>
              <Radio value='1'>停用</Radio>
            </Radio.Group>
          </Form.Item>}
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
