import React, {useState} from 'react';
import {Checkbox, Modal, Select as AntSelect, Spin,Form} from 'antd';
import SelectBatch from '@/pages/equipment/Batch/components/SelectBatch';

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

const Save = props => {

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {
      console.log(values);
      props.success();
    });
  };

  return (
    <Modal
      destroyOnClose
      afterClose={() => {
        form.resetFields();
      }}
      title='版本升级'
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
            label="当前版本"
            name='name'
          >
            <div>{props.data.v || '---'}</div>
          </Form.Item>
          <Form.Item
            key="pid"
            name='pid'
            label="选择版本"
            rules={[
              {required: true, message: '请选择选择版本'},
            ]}
          >
            <AntSelect placeholder='请选择选择版本' options={[{label: 'V1.1.1', value: '1'}, {label: 'V1.1.2', value: '2'},]} />
          </Form.Item>
          <Form.Item
            key="batchId"
            label="批次"
            name="batchId"
            rules={[
              {required: true, message: '请选择批次'},
            ]}
          >
            <SelectBatch />
          </Form.Item>
          <Form.Item
            key="pz"
            name='pz'
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
