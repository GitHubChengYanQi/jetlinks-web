import React, {useState} from 'react';
import {Checkbox, Modal, Select as AntSelect, Spin, Form} from 'antd';
import SelectBatch from '@/pages/equipment/Batch/components/SelectBatch';
import SelectFirmware from '@/pages/equipment/Firmware/components/SelectFirmware';

export const Check = (
  {
    value,
    onChange = () => {
    }
  }) => {
  return <div style={{textAlign: 'right'}}>
    <Checkbox
      checked={Boolean(value)}
      onChange={(check) => {
        onChange(check.target.checked);
      }}>
      保留配置
    </Checkbox>
  </div>;
};

const Save = (
  {
    modelId,
    categoryId,
    data = {},
    visible,
    success = () => {
    },
    close = () => {
    },
  }
) => {
  console.log(modelId, categoryId);
  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {
      success();
    });
  };

  return (
    <Modal
      destroyOnClose
      afterClose={() => {
        form.resetFields();
      }}
      title="版本升级"
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
            key="name"
            label="当前版本"
            name="name"
          >
            <div>{data?.v || '---'}</div>
          </Form.Item>
          <Form.Item
            key="pid"
            name="pid"
            label="选择版本"
            rules={[
              {required: true, message: '请选择选择版本'},
            ]}
          >
            <SelectFirmware modelId={modelId} categoryId={categoryId}  />
          </Form.Item>
          <Form.Item
            key="batchId"
            label="批次"
            name="batchId"
            rules={[
              {required: true, message: '请选择批次'},
            ]}
          >
            <SelectBatch modelId={modelId} categoryId={categoryId} />
          </Form.Item>
          <Form.Item
            key="pz"
            name="pz"
            labelCol={{span: 0}}
            wrapperCol={{span: 24}}
          >
            <Check />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
