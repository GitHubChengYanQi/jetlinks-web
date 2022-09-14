import React from 'react';
import {message, Modal, Spin, Form} from 'antd';
import {useRequest} from '@/util/Request';

const AntForm = (
  {
    labelCol = 6,
    wrapperCol = 18,
    width,
    apis = {},
    title = '',
    headerTitle = '',
    rowKey = '',
    close = () => {
    },
    onValuesChange = () => {
    },
    visible,
    initialValues = {},
    children,
    success = () => {
    },
    afterClose = () => {
    },
    format = (values) => {
      return values;
    }
  }
) => {

  const [form] = Form.useForm();

  const key = {};
  if (initialValues[rowKey]) {
    key[rowKey] = initialValues[rowKey];
  }

  const {loading: addLoading, run: add} = useRequest(apis.add, {
    manual: true,
    onSuccess: (res) => {
      message.success('添加成功！');
      success(res);
    }
  });
  const {loading: editLoading, run: edit} = useRequest(apis.edit, {
    manual: true,
    onSuccess: (res) => {
      message.success('修改成功！');
      success(res);
    }
  });

  const submitData = () => {
    form.validateFields().then((values) => {
      const data = format({...values, ...key});
      if (!data) {
        return;
      }
      if (initialValues[rowKey]) {
        edit({data});
      } else {
        add({data});
      }
    });
  };

  return <>
    <Modal
      afterClose={() => {
        afterClose();
        form.resetFields();
      }}
      destroyOnClose
      width={width || 500}
      title={headerTitle || `${initialValues[rowKey] ? '编辑' : '新建'}${title}`}
      open={visible}
      okText="确定"
      cancelText="取消"
      okButtonProps={{loading: addLoading || editLoading}}
      onOk={() => {
        submitData();
      }}
      onCancel={() => close()}
    >
      {visible && <Spin spinning={addLoading || editLoading}>
        <Form
          form={form}
          labelCol={{span: labelCol}}
          wrapperCol={{span: wrapperCol}}
          onValuesChange={onValuesChange}
        >
          {children}
        </Form>
      </Spin>}
    </Modal>
  </>;
};

export default AntForm;