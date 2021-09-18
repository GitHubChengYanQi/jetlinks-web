/**
 * 合同产品明细列表页
 *
 * @author sb
 * @Date 2021-09-18 15:29:24
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractDetailDelete, contractDetailList} from '../contractDetailUrl';
import ContractDetailEdit from '../contractDetailEdit';
import * as SysField from '../contractDetailField';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractDetailList = () => {
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
       <FormItem label="合同id" name="contractId" component={SysField.ContractId}/>
       <FormItem label="物品id" name="itemId" component={SysField.ItemId}/>
       <FormItem label="物品数量" name="quantity" component={SysField.Quantity}/>
       <FormItem label="创建者" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="创建时间" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
       <FormItem label="销售单价" name="salePrice" component={SysField.SalePrice}/>
       <FormItem label="总计" name="totalPrice" component={SysField.TotalPrice}/>
       <FormItem label="部门id" name="deptId" component={SysField.DeptId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={contractDetailList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="合同id" dataIndex="contractId"/>
        <Column title="物品id" dataIndex="itemId"/>
        <Column title="物品数量" dataIndex="quantity"/>
        <Column title="创建者" dataIndex="createUser"/>
        <Column title="修改者" dataIndex="updateUser"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="销售单价" dataIndex="salePrice"/>
        <Column title="总计" dataIndex="totalPrice"/>
        <Column title="部门id" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={contractDetailDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ContractDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContractDetailList;
