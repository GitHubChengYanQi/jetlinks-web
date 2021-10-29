import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer as AntDrawer, message} from 'antd';

const Drawer = (
  {
    title,
    children,
    component: Component,
    width = 600,
    onSuccess = () => {
    },
    onClose = () => {
    },
    ...props
  }, ref) => {

  const [value, show] = useState(null);
  // const [s, setShow] = useState(false);
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
      visible={visible}
      onClose={() => {
        show(null);
        onClose();
        onSuccess();
      }}
      destroyOnClose
      width={width}
      title={value ? `${title}` : `${title}`}
      afterVisibleChange={(v) => {
        // setShow(v);
      }}
    >
      {Component ? <Component
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
      /> : children}
    </AntDrawer>
  );
};


export default forwardRef(Drawer);
