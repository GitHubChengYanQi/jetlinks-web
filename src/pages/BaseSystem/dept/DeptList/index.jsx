import React, {useRef} from 'react';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import Drawer from "@/components/Drawer";
import AddButton from "@/components/AddButton";
import DeptEdit from "@/pages/BaseSystem/dept/DeptEdit";
import EditButton from "@/components/EditButton";
import DelButton from "@/components/DelButton";
import {deptDelete, deptList, deptTree} from "@/pages/BaseSystem/dept/url";
import {Input} from "antd";
import Form from "@/components/Form";
import Cascader from "@/components/Cascader";

const {FormItem} = Form;

const DeptList = () => {

  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="上级部门" name="deptId" component={Cascader} api={deptTree}/>
        <FormItem label="部门名称" name="condition" component={Input} placeholder="按部门名称搜索"/>
      </>
    );
  };

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
      width: 260,
      render: (value, record) => {
        return (
          <>
            <EditButton onClick={() => {
              ref.current.open(record.deptId);
            }}/>
            <DelButton api={deptDelete} value={record.deptId} onSuccess={() => {
              tableRef.current.refresh();
            }}/>
          </>
        );
      }
    },
  ];

  return (
    <>
      <Table
        rowKey="deptId"
        api={deptList}
        title={<Breadcrumb/>}
        columns={columns}
        ref={tableRef}
        actions={actions()}
        searchForm={searchForm}
      />
      <Drawer width={800} title="编辑菜单" component={DeptEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default DeptList;
