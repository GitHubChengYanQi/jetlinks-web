import React, {useRef} from 'react';
import {Button} from 'antd';

import {roleList} from '@/Config/ApiUrl/system/role';

import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import EditButton from "@/components/EditButton";
import MenuEdit from "@/pages/BaseSystem/menu/MenuEdit";
import Drawer from "@/components/Drawer";
import RoleEdit from "@/pages/BaseSystem/role/RoleEdit";


const RoleList = () => {

  const tableRef = useRef();
  const ref = useRef();

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
      width: 300,
      align: 'right',
      render: (value, record) => {
        return (
          <>
            <Button type="dashed" className="button-left-margin">权限配置</Button>
            <EditButton onClick={() => {
              ref.current.open(record.roleId);
            }}/>
            <DelButton/>
          </>
        );
      }
    }
  ];
  return (
    <>
      <Table
        api={roleList}
        title={<h2>角色管理</h2>}
        columns={columns}
        rowKey="roleId"
        ref={tableRef}
      />
      <Drawer width={800} title="编辑菜单" component={RoleEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default RoleList;
