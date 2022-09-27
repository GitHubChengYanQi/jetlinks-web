import React from 'react';
import {Input, InputNumber, Modal, Select, Radio, Checkbox} from 'antd';
import {createForm, SchemaForm} from '@formily/antd';
import DatePicker from '@/components/DatePicker';

const {Group: RadioGroup} = Radio;
const {Group: CheckboxGroup} = Checkbox;

const DynamicForms = (
  {
    formData,
    open,
    close = () => {
    },
    success = () => {
    }
  }
) => {

  const form = createForm();

  return <>
    <Modal
      maskClosable={false}
      destroyOnClose
      width={500}
      title={formData?.title}
      open={open}
      okText="确定"
      cancelText="取消"
      okButtonProps={{loading: false}}
      onOk={() => {
        form.submit((values) => {
          console.log(values);
        });
      }}
      onCancel={close}
    >
      <SchemaForm
        form={form}
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
      />
    </Modal>
  </>;
};

export default DynamicForms;
