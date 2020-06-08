import React from 'react';
import {Drawer, Message} from '@alifd/next';
import MenuEditForm from '@/pages/setting/system/menu/MenuEdit/MenuEditForm';

const MenuEdit = ({id, onClose,...other}) => {
  const visible = id !== null && id !== undefined;

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        typeof onClose === 'function' && onClose();
      }}
      width={600}
      title="权限编辑">
      <MenuEditForm
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


export default MenuEdit;