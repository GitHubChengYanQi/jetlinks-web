/**
 * 采购清单列表页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {purchaseListingDelete, purchaseListingList} from '../purchaseListingUrl';
import PurchaseListingEdit from '../purchaseListingEdit';
import * as SysField from '../purchaseListingField';

const {Column} = AntTable;
const {FormItem} = Form;

const PurchaseListingList = () => {
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
       <FormItem label="采购申请id" name="purchaseAskId" component={SysField.PurchaseAskId}/>
       <FormItem label="" name="skuId" component={SysField.SkuId}/>
       <FormItem label="申请数量" name="applyNumber" component={SysField.ApplyNumber}/>
       <FormItem label="可用数量" name="availableNumber" component={SysField.AvailableNumber}/>
       <FormItem label="交付日期" name="deliveryDate" component={SysField.DeliveryDate}/>
       <FormItem label="备注" name="note" component={SysField.Note}/>
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
        api={purchaseListingList}
        rowKey="purchaseListingId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="采购申请id" dataIndex="purchaseAskId"/>
        <Column title="" dataIndex="skuId"/>
        <Column title="申请数量" dataIndex="applyNumber"/>
        <Column title="可用数量" dataIndex="availableNumber"/>
        <Column title="交付日期" dataIndex="deliveryDate"/>
        <Column title="备注" dataIndex="note"/>
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
                ref.current.open(record.purchaseListingId);
              }}/>
              <DelButton api={purchaseListingDelete} value={record.purchaseListingId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={PurchaseListingEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default PurchaseListingList;
