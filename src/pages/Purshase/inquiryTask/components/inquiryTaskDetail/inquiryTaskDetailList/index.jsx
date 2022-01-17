/**
 * 询价任务详情列表页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {inquiryTaskDetailDelete, inquiryTaskDetailList} from '../inquiryTaskDetailUrl';
import InquiryTaskDetailEdit from '../inquiryTaskDetailEdit';
import * as SysField from '../inquiryTaskDetailField';

const {Column} = AntTable;
const {FormItem} = Form;

const InquiryTaskDetailList = () => {
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
       <FormItem label="主表id" name="inquiryTaskId" component={SysField.InquiryTaskId}/>
       <FormItem label="物料id" name="skuId" component={SysField.SkuId}/>
       <FormItem label="数量" name="total" component={SysField.Total}/>
       <FormItem label="备注" name="remark" component={SysField.Remark}/>
       <FormItem label="创建时间" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="创建用户" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="修改用户" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
       <FormItem label="部门id" name="deptId" component={SysField.DeptId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={inquiryTaskDetailList}
        rowKey="inquiryDetailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="主表id" dataIndex="inquiryTaskId"/>
        <Column title="物料id" dataIndex="skuId"/>
        <Column title="数量" dataIndex="total"/>
        <Column title="备注" dataIndex="remark"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="创建用户" dataIndex="createUser"/>
        <Column title="修改用户" dataIndex="updateUser"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="部门id" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.inquiryDetailId);
              }}/>
              <DelButton api={inquiryTaskDetailDelete} value={record.inquiryDetailId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={InquiryTaskDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default InquiryTaskDetailList;
