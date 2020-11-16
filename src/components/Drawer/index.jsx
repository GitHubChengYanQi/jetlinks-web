import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer as AntDrawer,message} from 'antd';

const Drawer = ({title, form: FormNode, onClose, width = 600,onSuccess=()=>{}, ...props}, ref) => {

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
          message.success(response.message);
          typeof onSuccess === 'function' && onSuccess();
        }}
        onError={(error) => {
          message.error(error.message);
        }}
      />}
    </AntDrawer>
  );
};


export default forwardRef(Drawer);
