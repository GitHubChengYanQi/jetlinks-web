import React from 'react';
import {Drawer} from '@alifd/next';
import RoleEditForm from '@/pages/setting/system/role/RoleEdit/RoleEditForm';
import Message from '@/components/Message';

const RoleEdit = ({id, onClose,...other}) => {
  const visible = id !== null && id !== undefined;

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        typeof onClose === 'function' && onClose();
      }}
      width={600}
      title="编辑角色">
      <RoleEditForm
        {...other}
        id={id}
        onSuccess={(response) => {
          Message.success(response.message);
          typeof onClose === 'function' && onClose();
        }}
        onError={(error) => {
          Message.error(error.message);
        }}
      />
    </Drawer>
  );
}


export default RoleEdit;