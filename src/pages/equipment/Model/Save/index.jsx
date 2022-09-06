import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Radio, Spin} from 'antd';
import FileUpload from '@/components/FileUpload';


const Save = props => {

  const {success, data, visible} = props;

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {

    });
  };


  return (
    <Modal
      destroyOnClose
      afterClose={() => form.resetFields()}
      title={`${data?.id ? '编辑' : '新建'}设备型号`}
      open={visible}
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
            initialValue={data?.name}
            key="name"
            label="设备型号名称"
            name="name"
            rules={[
              {required: true, message: '请输入设备型号名称'},
            ]}
          >
            <Input placeholder="请输入设备型号名称"/>
          </Form.Item>
          <Form.Item
            initialValue={data?.classifiedId}
            key="classifiedId"
            label="选择设备类别"
            name="classifiedId"
            rules={[
              {required: true, message: '请选择设备类别'},
            ]}
          >
            {/* <SelectTopClass onGetNode={setClassified} /> */}
          </Form.Item>
          <Form.Item
            initialValue={data?.name || '0'}
            key="status"
            label="设备型号状态"
            name="status"
            rules={[
              {required: true, message: '请选择设备型号状态'},
            ]}
          >
            <Radio.Group>
              <Radio value="0">启用</Radio>
              <Radio value="1">停用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            initialValue={data?.fileId}
            key="fileId"
            label="上传通信协议"
            name="fileId"
            rules={[
              {required: true, message: '请上传通信协议'},
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
