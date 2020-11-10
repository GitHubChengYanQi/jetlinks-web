import React from 'react';
import {Button} from '@alifd/next';

import {roleList} from '@/Config/ApiUrl/system/role';

import Table from '@/components/Table';


const RoleList = () => {

  const columns = [
    {
      title: '名称',
      width: 200,
      dataIndex: 'name'
    },
    {
      title: '上级角色',
      width: 200,
      dataIndex: 'pName'
    },
    {
      title: '别名',
      width: 300,
      dataIndex: 'description'
    },
    {},
    {
      title: '操作',
      width: 200,
      align: 'right',
      render: () => {
        return (<Button type='secondary' className="button-right-margin">权限配置</Button>);
      }
    }
  ];
  return (
    <Table
      api={roleList}
      title={<h2>角色管理</h2>}
      columns={columns}
      rowKey="roleId"
    />
  );
};

export default RoleList;
