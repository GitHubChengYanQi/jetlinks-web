import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {message, Modal as AntdModal} from 'antd';
import {randomString} from '@/util/Tools';

const Modal = (
  {
    title,
    modal,
    component: Component,
    width,
    footer,
    padding,
    onSuccess = () => {
    },
    onClose = () => {
    },
    compoentRef,
    children,
    ...props
  }, ref) => {


  const [value, show] = useState(null);

  if (modal !== undefined) {
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
      visible={visible}
      footer={footer || null}
      centered
      maskClosable={false}
      onCancel={() => {
        show(null);
        onClose();
        onSuccess();
      }}
      bodyStyle={{padding: 0}}
      width={width}
      title={title}
      destroyOnClose
    >
      <div style={{maxHeight: footer?'calc(100vh - 110px)':'calc(100vh - 55px)', overflow: 'auto'}}>
        {Component ? <Component
          {...props}
          ref={compoentRef}
          value={value}
          onSuccess={(response) => {
            onSuccess(response);
          }}
          onError={(error) => {
            message.error(error.message);
            show(null);
            onClose();
          }}
        /> : children}
      </div>
    </AntdModal>
  );
};


export default forwardRef(Modal);
