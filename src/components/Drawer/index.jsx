import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Drawer as AntDrawer} from 'antd';

const Drawer = (
  {
    title,
    children,
    headTitle,
    component: Component,
    width = 600,
    placement,
    extra,
    onSuccess = () => {
    },
    height,
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
      height={height}
      visible={visible}
      extra={extra && <Button type='link' onClick={() => {
        show(null);
      }}>关闭</Button>}
      onClose={() => {
        show(null);
        onClose();
      }}
      destroyOnClose
      width={width}
      title={headTitle || (title && (value ? `编辑${title}` : `添加${title}`))}
      afterVisibleChange={(v) => {
        // setShow(v);
      }}
      placement={placement}
    >
      {Component ? <Component
        {...props}
        value={value}
        onSuccess={(response) => {
          onSuccess(response);
        }}
        onError={() => {
        }}
      /> : children}
    </AntDrawer>
  );
};


export default forwardRef(Drawer);
