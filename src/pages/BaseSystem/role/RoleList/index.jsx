import React, {useRef} from 'react';
import {Button, Input} from 'antd';

import {roleList} from '@/Config/ApiUrl/system/role';

import Table from '@/components/Table';
import EditButton from "@/components/EditButton";
import Drawer from "@/components/Drawer";
import RoleEdit from "@/pages/BaseSystem/role/RoleEdit";
import RoleSet from "@/pages/BaseSystem/role/RoleSet";
import AddButton from "@/components/AddButton";
import Breadcrumb from '@/components/Breadcrumb';
import FormItem from '@/components/Table/components/FormItem/index';


const RoleList = () => {

  const tableRef = useRef(null);
  const ref = useRef(null);
  const refRoleSet = useRef(null);

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
      width: 360,
      align: 'right',
      render: (value, record) => {
        return (
          <>
            <Button
              type="dashed"
              className="button-left-margin"
              onClick={() => {
                refRoleSet.current.open(record.roleId);
              }}>权限配置</Button>
            <EditButton onClick={() => {
              ref.current.open(record.roleId);
            }}/>
            {/*<DelButton/>*/}
          </>
        );
      }
    }
  ];

  const searchForm = () => {
    return (
      <>
        <FormItem label="角色名称" name="name" component={Input} />
      </>
    );
  };


  return (
    <>
      <Table
        searchForm={searchForm}
        api={roleList}
        title={<Breadcrumb />}
        columns={columns}
        rowKey="roleId"
        searchButtons={[<AddButton key='1' onClick={() => {
          ref.current.open(false);
        }}/>]}
        ref={tableRef}
      />
      <Drawer width={800} title="编辑角色" component={RoleEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
      <Drawer width={800} title="设置权限" component={RoleSet} onSuccess={() => {
        tableRef.current.refresh();
        refRoleSet.current.close();
      }} ref={refRoleSet}/>
    </>
  );
};

export default RoleList;
