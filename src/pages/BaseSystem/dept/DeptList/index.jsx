import React from 'react';
import {deptDelete, deptList} from '@/Config/ApiUrl/system/dept';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';

const DeptList = () => {

  const columns = [
    {
      title: '部门简称', dataIndex: 'simpleName', width: 120
    },
    {
      title: '部门全称', dataIndex: 'fullName', width: 120
    },
    {
      title: '排序', dataIndex: 'sort', width: 80
    },
    {
      title: '备注', dataIndex: 'description', width: 200
    },
    {},
    {
      title: '操作',
      dataIndex: 'description',
      align: 'right',
      width: 200
    },
  ];

  return (
    <Table
      rowKey="deptId"
      api={deptList}
      title={<Breadcrumb />}
      columns={columns}
    />
  );
};

export default DeptList;
