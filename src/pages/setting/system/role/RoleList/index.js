import React from 'react';
import {Button, Table} from '@alifd/next';

import {roleList, roleRemove} from '@/Config/ApiUrl/system/role';
import RoleEdit from '@/pages/setting/system/role/RoleEdit';

import List from '@/components/List';

const ApiConfg = {
  listApi: roleList,
  delApi: roleRemove,
}

const RoleList = () => {

  const renderOption = (value, index, record) => {
    return (<Button type='secondary' className="button-right-margin">权限配置</Button>);
  };

  return (
    <List
      ApiConfig={ApiConfg}
      Title={<h2>角色管理</h2>}
      ListButton={renderOption}
      Edit={RoleEdit}
      fieldKey="roleId"
    >
      <Table.Column title="名称" dataIndex="name" width={200}/>
      <Table.Column title="上级角色" dataIndex="pName" width={200}/>
      <Table.Column title="别名" dataIndex="description" width={300}/>
    </List>
  );
};

export default RoleList;
