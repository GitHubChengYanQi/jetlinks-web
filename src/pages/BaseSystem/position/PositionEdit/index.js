import React from 'react';
import {Drawer} from '@alifd/next';
import PositionForm from '@/pages/setting/system/position/PositionEdit/PositionForm';
import Message from '@/components/Message';

const PositionEdit = ({id, onClose}) => {
  const visible = id !== null && id !== undefined;

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        typeof onClose === 'function' && onClose();
      }}
      width={600}
      title="编辑职位">
      <PositionForm
        id={id}
        onSuccess={(response) => {
          Message.success(response.message);
          typeof onClose === 'function' && onClose();
        }}
        onError={(error) => {
          Message.error(error.message);
          typeof onClose === 'function' && onClose();
        }}
      />
    </Drawer>
  );
}


export default PositionEdit;