import React from 'react';
import {Input, InputNumber, Modal, Select, Radio, Checkbox, message} from 'antd';
import {createForm, SchemaForm} from '@formily/antd';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';

const {Group: RadioGroup} = Radio;
const {Group: CheckboxGroup} = Checkbox;

export const submitApi = {url: '/device/buttonSubmit', method: 'POST'};

const form = createForm();

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
    onError: () => message.error('添加失败！')
  });

  return <>
    <Modal
      maskClosable={false}
      destroyOnClose
      width={500}
      title={formData?.title || '设置'}
      open={open}
      okText="确定"
      cancelText="取消"
      okButtonProps={{loading}}
      onOk={() => {
        form.submit((values) => {
          run({data: {buttonData: values, mac: formData?.mac}});
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
