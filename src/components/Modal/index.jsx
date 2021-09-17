import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {message, Modal as AntdModal} from 'antd';

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
  const [height, setHeight] = useState(null);
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

  const setSize = () => {
    const modalContent = document.getElementById('modalContent');
    if (modalContent) {
      setHeight(document.body.offsetHeight - 110);
    }
  };

  useEffect(() => {
    window.onresize = () => {
      setSize();
    };
  }, []);

  useEffect(() => {
    setSize();

  }, [Component, children]);

  const visible = value !== null && value !== undefined;

  console.log(width);

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
      <div style={{maxHeight: height, overflow: 'auto'}}>
        <div id="modalContent">
          {Component ? <Component
            {...props}
            ref={compoentRef}
            value={value}
            onSuccess={(response) => {
              onSuccess();
            }}
            onError={(error) => {
              message.error(error.message);
              show(null);
              onClose();
            }}
          /> : children}
        </div>
      </div>
    </AntdModal>
  );
};


export default forwardRef(Modal);
