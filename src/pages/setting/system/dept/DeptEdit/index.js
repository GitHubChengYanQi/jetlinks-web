import React from 'react';
import {Drawer, Message} from '@alifd/next';
import DeptEditForm from '@/pages/setting/system/dept/DeptEdit/DeptEditForm';

const DeptEdit = ({id, onClose,...other}) => {
  const visible = id !== null && id !== undefined;

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        typeof onClose === 'function' && onClose();
      }}
      width={600}
      title="部门编辑">
      <DeptEditForm
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


export default DeptEdit;