import React from 'react';
import {Input, InputNumber, Modal, Select, Radio, Checkbox, message, Button, Space, Spin} from 'antd';
import {SchemaForm, Submit} from '@formily/antd';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';

const {Group: RadioGroup} = Radio;
const {Group: CheckboxGroup} = Checkbox;

export const submitApi = {url: '/device/buttonSubmit', method: 'POST'};

const DynamicForms = (
  {
    formData,
    open,
    close = () => {
    },
    success = () => {
    },
  }
) => {

  const {loading, run} = useRequest(submitApi, {
    manual: true,
    onSuccess: () => {
      message.success(`${formData?.title || '设置'}成功！`);
      success();
    },
  });

  return <>
    <Modal
      bodyStyle={{padding: 0}}
      footer={null}
      maskClosable={false}
      destroyOnClose
      width={500}
      title={formData?.title || '设置'}
      open={open}
      onCancel={close}
    >
      <Spin spinning={loading}>
        <SchemaForm
          style={{paddingTop: 16}}
          onSubmit={(values) => {
            run({data: {buttonData: values, mac: formData?.mac}});
          }}
          components={{
            Input,
            Select,
            InputNumber,
            RadioGroup,
            CheckboxGroup,
            DatePicker,
          }}
          labelCol={7}
          wrapperCol={12}
          schema={{
            type: 'object',
            properties: formData?.data || {}
          }}
        >
          <div style={{
            borderTop: 'solid #f0f0f0 1px',
            padding: 8,
            textAlign: 'right'
          }}>
            <Space>
              <Button onClick={close}>取消</Button>
              <Submit>保存</Submit>
            </Space>
          </div>
        </SchemaForm>
      </Spin>
    </Modal>
  </>;
};

export default DynamicForms;
