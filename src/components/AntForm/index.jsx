import React from 'react';
import {message, Modal, Spin} from 'antd';
import Form from 'antd/es/form';
import {useRequest} from '@/util/Request';

const AntForm = (
  {
    apis = {},
    title = '',
    rowKey = '',
    close = () => {
    },
    visible,
    initialValues = {},
    children,
    success = () => {
    },
    format = (values) => {
      return values;
    }
  }
) => {

  const [form] = Form.useForm();

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
      const data = format(values);
      if (initialValues[rowKey]) {
        edit({data});
      } else {
        add({data});
      }
    });
  };

  return <>
    <Modal
      afterClose={() => form.resetFields()}
      destroyOnClose
      width={800}
      title={`${initialValues[rowKey] ? '编辑' : '新建'}${title}`}
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
        <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
          {children}
        </Form>
      </Spin>}
    </Modal>
  </>;
};

export default AntForm;
