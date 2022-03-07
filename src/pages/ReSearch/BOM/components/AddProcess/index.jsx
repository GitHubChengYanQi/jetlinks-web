import React from 'react';
import {Button, Form, Space} from 'antd';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';

const AddProcess = ({value, onChange, onClose}) => {

  return <>
    <Form
      initialValues={value}
      labelCol={{span: 5}}
      wrapperCol={{span: 15}}
      onFinish={async (value) => {
        onChange(value);
      }}
    >


      <Form.Item name="skuId" label="适用物料" rules={[{required: true, message: '请选择适用物料'}]}>
        <SelectSku />
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Space>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={() => {
            onClose();
          }}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </>;
};

export default AddProcess;
