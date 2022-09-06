import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Select, Spin} from 'antd';
import Position from '@/pages/equipment/Equipment/Save/components/Position';


const Save = props => {

  const {success, data, visible, close} = props;

  const [loading,] = useState();

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {

    });
  };

  return (
    <Modal
      destroyOnClose
      afterClose={() => form.resetFields()}
      title={`${data.id ? '编辑' : '新建'}设备`}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => close()}
    >
      <Spin spinning={loading}>
        <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 18}}>
          <Form.Item
            key="mac"
            label="设备MAC"
            name="mac"
            rules={[
              {required: true, message: '请输入设备MAC'},
            ]}
          >
            <Input placeholder="请输入设备MAC"/>
          </Form.Item>
          <Form.Item
            key="cus"
            label="所属客户"
            name="cus"
            rules={[
              {required: false, message: '请选择所属客户'},
            ]}
          >
            <Select placeholder="请选择所属客户"/>
          </Form.Item>
          <Form.Item
            key="note"
            label="终端备注"
            name="note"
            rules={[
              {required: true, message: '请输入终端备注'},
            ]}
          >
            <Input placeholder="请输入客户名称"/>
          </Form.Item>
          <Form.Item
            initialValue={data.name}
            key="name"
            label="登记名称"
            name="name"
            rules={[
              {required: true, message: '请输入登记名称'},
            ]}
          >
            <Input placeholder="请输入登记名称"/>
          </Form.Item>
          <Form.Item
            key="id"
            label="设备类别"
            name="id"
            rules={[
              {required: false, message: '请选择设备类别'},
            ]}
          >
            <Select placeholder="请选择设备类别"/>
          </Form.Item>
          <Form.Item
            initialValue={data.productId}
            key="productId"
            label="设备型号"
            name="productId"
            rules={[
              {required: true, message: '请选择设备型号'},
            ]}
          >
            <Select placeholder="请选择设备型号"/>
          </Form.Item>
          <Form.Item
            key="position"
            label="经纬度信息"
            name="position"
            rules={[
              {required: false, message: '请输入经纬度信息'},
            ]}
          >
            <Position/>
          </Form.Item>
          <Form.Item
            key="address"
            label="位置信息"
            name="address"
            rules={[
              {required: false, message: '请选择位置信息'},
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            key="describe"
            label="详细地址"
            name="describe"
            rules={[
              {required: true, message: '请输入详细地址'},
            ]}
          >
            <Input.TextArea placeholder="请输入详细地址"/>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
