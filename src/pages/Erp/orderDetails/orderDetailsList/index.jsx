/**
 * 订单明细表列表页
 *
 * @author siqiang
 * @Date 2021-08-18 13:26:29
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {orderDetailsDelete, orderDetailsList} from '../orderDetailsUrl';
import OrderDetailsEdit from '../orderDetailsEdit';
import * as SysField from '../orderDetailsField';
import Breadcrumb from "@/components/Breadcrumb";

const {Column} = AntTable;
const {FormItem} = Form;

const OrderDetailsList = (props) => {
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
        <FormItem label="产品名称"   name="itemId" component={SysField.itemId}/>
        <FormItem style={{'display': 'none'}}   name="orderId" value={props.value} component={SysField.itemId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb title='订单明细'/>}
        api={orderDetailsList}
        rowKey="id"
        searchForm={searchForm}
        // actions={actions()}
        ref={tableRef}
      >
        <Column title="订单id" dataIndex="orderId"/>
        <Column title="产品名称" width={120} dataIndex="itemId" render={(value,record)=>{
          return (
            <div>
              {
                record.itemsResult ? record.itemsResult.name : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="数量" width={120}  dataIndex="number"/>
        <Column title="价格" width={120} dataIndex="price"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={orderDetailsDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="订单明细" component={OrderDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OrderDetailsList;
