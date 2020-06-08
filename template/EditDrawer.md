# 抽屉展示编辑页面

```jsx
import React from 'react';
import {Drawer, Message} from '@alifd/next';
import UserEditForm from './UserEditForm';

const UserEdit = ({id, onClose,...other}) => {

  const visible = id !== null && id !== undefined;

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        typeof onClose === 'function' && onClose();
      }}
      width={600}
      title="编辑用户">
      <UserEditForm
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

export default UserEdit;
```