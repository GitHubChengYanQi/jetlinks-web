import React from 'react';
import {Table} from '@alifd/next';
import {deptDelete, deptList} from '@/Config/ApiUrl/system/dept';
import DeptEdit from '@/pages/setting/system/dept/DeptEdit';
import List from '@/components/List';

const ApiConfig = {
  listApi: deptList,
  delApi: deptDelete,
}

const DeptList = () => {
  return (
    <List
      fieldKey="deptId"
      ApiConfig={ApiConfig}
      Edit={DeptEdit}
      Title={<h2>部门管理</h2>}
    >
      <Table.Column title="部门简称" dataIndex="simpleName" width={120}/>
      <Table.Column title="部门全称" dataIndex="fullName" width={120}/>
      <Table.Column title="排序" dataIndex="sort" width={80}/>
      <Table.Column title="备注" dataIndex="description" width={200}/>
    </List>
  );
};
export default DeptList;
