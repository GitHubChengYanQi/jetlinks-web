import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer as AntDrawer} from 'antd';

const Drawer = ({title, form: FormNode, onClose, width = 600, ...props}, ref) => {

  const [id, show] = useState(null);

  const open = (id) => {
    show(id);
  };

  const close = () => {
    show(null);
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  const visible = id !== null && id !== undefined;

  return (
    <AntDrawer
      visible={visible}
      onClose={() => {
        show(null);
        typeof onClose === 'function' && onClose();
      }}
      width={width}
      title={title}>
      {FormNode && <FormNode
        {...props}
        id={id}
        onSuccess={(response) => {
          // Message.success(response.message);
          typeof onClose === 'function' && onClose();
        }}
        onError={(error) => {
          // Message.error(error.message);
        }}
      />}
    </AntDrawer>
  );
};


export default forwardRef(Drawer);
