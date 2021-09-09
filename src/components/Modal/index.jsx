import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, message, Modal as AntdModal} from 'antd';
import {Reset, Submit} from '@formily/antd';
import Title from '@/components/Title';

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
      style={{minWidth:800}}
      visible={visible}
      footer={footer || []}
      centered
      maskClosable={false}
      onCancel={() => {
        show(null);
        onClose();
      }}
      bodyStyle={{padding:padding || 24}}
      width={width}
      title={<Title title={title &&  (value ? `编辑${title}` : `添加${title}`)} level={3} />}
      destroyOnClose
    >
      {Component && <Component
        {...props}
        ref={compoentRef}
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
