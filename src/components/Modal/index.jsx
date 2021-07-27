import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer, Drawer as AntDrawer, message, Modal} from 'antd';

const Modal2 = (
  {
    title,
    component: Component,
    width,
    onSuccess = () => {
    },
    onClose = () => {
    },
    ...props
  }, ref) => {

  const [value, show] = useState(null);
  const [s, setShow] = useState(false);
  const open = (value) => {
    show(value);
  };

  const close = () => {
    show(null);
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  const visible = value !== null && value !== undefined;

  return (
    <Modal
      style={{margin:'auto'}}
      footer={[]}
      visible={visible}
      onCancel={() => {
        show(null);
        onClose();
      }}
      width={width}
      title={value ? '编辑' : '添加'}
      destroyOnClose
    >
      {Component && <Component
        {...props}
        value={value}
        onSuccess={(response) => {
          // message.success(response.message);
          onSuccess();
        }}
        onError={(error) => {
          message.error(error.message);
          show(null);
          onClose();
        }}
      />}
    </Modal>
  );
};


export default forwardRef(Modal2);
