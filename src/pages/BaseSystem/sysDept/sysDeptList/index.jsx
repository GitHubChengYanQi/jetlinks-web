/**
 * 部门表列表页
 *
 * @author
 * @Date 2020-12-21 17:16:04
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import SearchButton from '@/components/SearchButton';
import {sysDeptDelete, sysDeptList} from '../sysDeptUrl';
import SysDeptEdit from '../sysDeptEdit';
import * as SysField from '../sysDeptField';


const {Column} = AntTable;
const {FormItem} = Form;

const MenuList = () => {
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
        <FormItem label="父部门id" name="pidValue" component={SysField.Pid}/>
        <FormItem label="简称" name="simpleName" component={SysField.SimpleName}/>
        <FormItem label="全称" name="fullName" component={SysField.FullName}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={sysDeptList}
        rowKey="deptId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="父部门id" dataIndex="pid"/>
        <Column title="简称" dataIndex="simpleName"/>
        <Column title="全称" dataIndex="fullName"/>
        <Column title="描述" dataIndex="description"/>
        <Column title="排序" dataIndex="sort"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.deptId);
              }}/>
              <DelButton api={sysDeptDelete} value={record.deptId} onSuccess={() => {
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={SysDeptEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default MenuList;
