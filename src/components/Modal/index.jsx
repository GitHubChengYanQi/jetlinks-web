import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {message, Modal as AntdModal} from 'antd';

const Modal = (
  {
    title,
    modal,
    component: Component,
    width,
    onSuccess = () => {
    },
    onClose = () => {
    },
    ...props
  }, ref) => {

  const [value, show] = useState(null);
  if (modal!==undefined){
    show(false);
  }

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
    <AntdModal
      style={{margin:'auto'}}
      footer={[]}
      visible={visible}
      centered
      maskClosable={false}
      onCancel={() => {
        show(null);
        onClose();
      }}
      width={width}
      title={title ? (value ? `编辑${title}` : `添加${title}`) : null}
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
    </AntdModal>
  );
};


export default forwardRef(Modal);
