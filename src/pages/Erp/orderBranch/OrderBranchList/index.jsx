/**
 * 货单分表列表页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {orderBranchDelete, orderBranchList} from '../OrderBranchUrl';
import OrderBranchEdit from '../OrderBranchEdit';
import * as SysField from '../OrderBranchField';
import Modal2 from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const OrderBranchList = () => {
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
       <FormItem label="货单编号" name="orderId" component={SysField.OrderId}/>
       <FormItem label="产品id" name="itemId" component={SysField.ItemId}/>
       <FormItem label="产品名称" name="name" component={SysField.Name}/>
     </>
    );
  };

  const routes = [
    {
      path: '/',
      breadcrumbName: 'Home',
    },
    {
      path: '/CRM',
      breadcrumbName: 'CRM',
    },
    {
      path: '/CRM/orderBranch',
      breadcrumbName: '货单管理',
    },
  ];

  return (
    <>
      <Table
        title={
          <PageHeader
            className="site-page-header"
            breadcrumb={{ routes }}
          />
        }
        api={orderBranchList}
        rowKey="id"
        isModal={false}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="货单编号" dataIndex="orderId"/>
        <Column title="产品id" dataIndex="itemId"/>
        <Column title="产品名称" dataIndex="name"/>
        <Column title="产品单价" dataIndex="price"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={orderBranchDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={800} title="编辑" component={OrderBranchEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OrderBranchList;
