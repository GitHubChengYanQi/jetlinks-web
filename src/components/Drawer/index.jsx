import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer as AntDrawer} from 'antd';

const Drawer = ({title, form: FormNode, onClose, ...props}, ref) => {

  const [id, show] = useState(null);
  useImperativeHandle(ref, () => ({
    show
  }));

  const visible = id !== null && id !== undefined;

  return (
    <AntDrawer
      visible={visible}
      onClose={() => {
        show(null);
        typeof onClose === 'function' && onClose();
      }}
      width={600}
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
