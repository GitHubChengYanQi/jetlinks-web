/**
 * 产品订单列表页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productOrderDelete, productOrderList} from '../productOrderUrl';
import ProductOrderEdit from '../productOrderEdit';
import * as SysField from '../productOrderField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProductOrderDetailsList from '@/pages/Erp/productOrderDetails/productOrderDetailsList';
import {useHistory} from 'ice';

const {Column} = AntTable;
const {FormItem} = Form;

const ProductOrderList = () => {
  const ref = useRef(null);
  const refDetail = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory();

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="订购客户" style={{width:200}} name="customerId" component={SysField.Customer} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={productOrderList}
        rowKey="productOrderId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="订单号" dataIndex="productOrderId" render={(value)=>{
          return (
            <Button type='link' onClick={()=>{
              refDetail.current.open(value);
            }}>{value}</Button>
          );
        }} />
        <Column title="订购客户" dataIndex="customerId" render={(value,record)=>{
          return (
            <Button type='text' onClick={()=>{
              history.push(`/CRM/customer/${value}`);
            }}>{record.customerResult && record.customerResult.customerName}</Button>
          );
        }} />
        <Column title="数量" dataIndex="number" />
        <Column title="总金额" dataIndex="money" />
        {/*<Column title="创建人" dataIndex="createUser" />*/}
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.productOrderId);
              }} />
              <DelButton api={productOrderDelete} value={record.productOrderId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={1100} title="订单" component={ProductOrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

      <Modal width={800} headTitle="订单详情" component={ProductOrderDetailsList} onSuccess={() => {
        tableRef.current.refresh();
        refDetail.current.close();
      }} ref={refDetail} />
    </>
  );
};

export default ProductOrderList;
