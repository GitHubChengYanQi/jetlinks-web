import React from 'react';
import {Drawer, Message} from '@alifd/next';
import UserRoleForm from '@/pages/setting/system/user/UserRole/UserRoleForm';

const UserRole = ({id, onClose}) => {
  const visible = id !== null && id !== undefined;

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        typeof onClose === 'function' && onClose();
      }}
      width={600}
      title="分配角色">
      <UserRoleForm
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


export default UserRole;