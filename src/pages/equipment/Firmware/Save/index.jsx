import React from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Radio, Select, Spin} from 'antd';
import FileUpload from '@/components/FileUpload';

const Save = props => {

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
      title={`${props.data?.id ? '编辑' : '新建'}设备固件`}
      open={props.visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => props.close()}
    >
      <Spin spinning={false}>
        <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 18}}>
          <Form.Item
            initialValue={props.data?.name}
            key="0"
            label="设备固件名称"
            name="name"
            rules={[
              {required: true, message: '请输入设备固件名称'},
            ]}
          >
            <Input placeholder="请输入设备固件名称"/>
          </Form.Item>
          <Form.Item
            initialValue={props.data?.name}
            key="1"
            label="设备所属类别"
            name="class"
            rules={[
              {required: true, message: '请选择设备所属类别'},
            ]}
          >
            <Select placeholder="请选择设备所属类别"/>
          </Form.Item>
          <Form.Item
            initialValue={props.data?.name}
            key="2"
            label="设备所属型号"
            name="class"
            rules={[
              {required: true, message: '请选择设备所属型号'},
            ]}
          >
            <Select placeholder="请选择设备所属型号"/>
          </Form.Item>
          <Form.Item
            initialValue="0"
            key="3"
            label="固件状态"
            name="id"
            rules={[
              {required: true, message: '请选择固件状态'},
            ]}
          >
            <Radio.Group>
              <Radio value="0">启用</Radio>
              <Radio value="1">停用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            key="4"
            label="上传设备固件"
            name="file"
            rules={[
              {required: true, message: '请上传设备固件'},
            ]}
          >
            <FileUpload/>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
