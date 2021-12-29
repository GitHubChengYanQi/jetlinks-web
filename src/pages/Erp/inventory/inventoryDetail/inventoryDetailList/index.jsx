/**
 * 盘点任务详情列表页
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {inventoryDetailDelete, inventoryDetailList} from '../inventoryDetailUrl';
import InventoryDetailEdit from '../inventoryDetailEdit';
import * as SysField from '../inventoryDetailField';

const {Column} = AntTable;
const {FormItem} = Form;

const InventoryDetailList = () => {
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
       <FormItem label="对应实物id" name="inkindId" component={SysField.InkindId}/>
       <FormItem label="" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="部门id" name="deptId" component={SysField.DeptId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={inventoryDetailList}
        rowKey="detailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="对应实物id" dataIndex="inkindId"/>
        <Column title="" dataIndex="createUser"/>
        <Column title="" dataIndex="updateUser"/>
        <Column title="" dataIndex="createTime"/>
        <Column title="" dataIndex="updateTime"/>
        <Column title="部门id" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.detailId);
              }}/>
              <DelButton api={inventoryDetailDelete} value={record.detailId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={InventoryDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default InventoryDetailList;
