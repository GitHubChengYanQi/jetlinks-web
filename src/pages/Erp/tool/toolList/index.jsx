/**
 * 工具表列表页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {toolDelete, toolList} from '../toolUrl';
import ToolEdit from '../toolEdit';
import * as SysField from '../toolField';

const {Column} = AntTable;
const {FormItem} = Form;

const ToolList = () => {
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
       <FormItem label="工具名称" name="name" component={SysField.Name}/>
       <FormItem label="工具状态" name="state" component={SysField.State}/>
       <FormItem label="备注" name="note" component={SysField.Note}/>
       <FormItem label="附件" name="attachment" component={SysField.Attachment}/>
       <FormItem label="单位id" name="unitId" component={SysField.UnitId}/>
       <FormItem label="工具分类id" name="toolClassificationId" component={SysField.ToolClassificationId}/>
       <FormItem label="创建者" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="创建时间" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
       <FormItem label="部门id" name="deptId" component={SysField.DeptId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={toolList}
        rowKey="toolId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="工具名称" dataIndex="name"/>
        <Column title="工具状态" dataIndex="state"/>
        <Column title="备注" dataIndex="note"/>
        <Column title="附件" dataIndex="attachment"/>
        <Column title="单位id" dataIndex="unitId"/>
        <Column title="工具分类id" dataIndex="toolClassificationId"/>
        <Column title="创建者" dataIndex="createUser"/>
        <Column title="修改者" dataIndex="updateUser"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="部门id" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.toolId);
              }}/>
              <DelButton api={toolDelete} value={record.toolId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ToolEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ToolList;
