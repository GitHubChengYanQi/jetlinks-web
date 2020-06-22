import React from 'react';
import {Table} from '@alifd/next';

import {menuList, menuRemove} from '@/Config/ApiUrl/system/menu';
import MenuEdit from '@/pages/setting/system/menu/MenuEdit';
import List from '@/components/List';

const ApiConfig = {
  listApi: menuList,
  delApi: menuRemove,
};

const MenuList = () => {

  return (
    <List
      Title={<h2>权限管理</h2>}
      ApiConfig={ApiConfig}
      Edit={MenuEdit}
      fieldKey="menuId"
    >
      <Table.Column title="名称" dataIndex="name" width={200}/>
      <Table.Column title="编码" dataIndex="code" width={200}/>
      <Table.Column title="状态" dataIndex="statusName" width={200}/>
      <Table.Column title="请求地址" dataIndex="url" width={300}/>
    </List>
  );
};

export default MenuList;
