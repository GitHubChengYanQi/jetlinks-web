import React, {useEffect, useRef} from 'react';
import {message, Spin, Form, Space, Button,Modal as AntModal} from 'antd';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';

const AntForm = (
  {
    zIndex,
    loading = false,
    labelCol = 6,
    wrapperCol = 18,
    width,
    apis = {},
    title = '',
    headerTitle = '',
    rowKey = '',
    errorHandle,
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
    },
    form,
  }
) => {

  const ref = useRef();

  useEffect(() => {
    if (visible) {
      ref.current.open(false);
    } else {
      ref.current.close();
    }
  }, [visible]);

  if (!form) {
    form = Form.useForm()[0];
  }

  const key = {};
  if (initialValues[rowKey]) {
    key[rowKey] = initialValues[rowKey];
  }

  const {loading: addLoading, run: add} = useRequest(apis.add, {
    manual: true,
    response: true,
    onSuccess: (res) => {
      if (res.errCode === 1001) {
        if (typeof errorHandle === 'function') {
          errorHandle();
          return;
        }
        AntModal.warn({
          content: res.message,
          okText: '确认'
        });
        return;
      }
      message.success('添加成功！');
      success(res.data || true);
    },
  });
  const {loading: editLoading, run: edit} = useRequest(apis.edit, {
    manual: true,
    onSuccess: (res) => {
      if (res.errCode === 1001) {
        if (typeof errorHandle === 'function') {
          errorHandle();
          return;
        }
        AntModal.warn({
          content: res.message,
          okText: '确认'
        });
        return;
      }
      message.success('修改成功！');
      success(false);
    },
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
      ref={ref}
      zIndex={zIndex}
      afterClose={() => {
        afterClose();
        form.resetFields();
      }}
      destroyOnClose
      width={width || 500}
      onClose={close}
      headTitle={headerTitle || `${initialValues[rowKey] ? '编辑' : '新建'}${title}`}
      footer={<Space>
        <Button onClick={close}>取消</Button>
        <Button onClick={() => submitData()} type="primary" loading={addLoading || editLoading}>确定</Button>
      </Space>}
    >
      <div style={{padding:24}}>
        {visible && <Spin spinning={addLoading || editLoading || loading}>
          <Form
            form={form}
            labelCol={{span: labelCol}}
            wrapperCol={{span: wrapperCol}}
            onValuesChange={onValuesChange}
          >
            {children}
          </Form>
        </Spin>}
      </div>
    </Modal>
  </>;
};

export default AntForm;
