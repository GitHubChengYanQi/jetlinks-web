import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer as AntDrawer, message} from 'antd';

const Drawer = (
  {
    title,
    component: Component,
    width = 600,
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
    <AntDrawer
      destroyOnClose
      visible={visible}
      onClose={() => {
        show(null);
        onClose();
      }}
      width={width}
      title={value ? '编辑' : '添加'}
      afterVisibleChange={(v) => {
        setShow(v);
      }}
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
    </AntDrawer>
  );
};


export default forwardRef(Drawer);
