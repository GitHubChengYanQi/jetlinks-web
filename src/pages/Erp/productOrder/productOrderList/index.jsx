/**
 * 产品订单列表页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
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

const {Column} = AntTable;
const {FormItem} = Form;

const ProductOrderList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
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
        <FormItem label="订购客户" name="customerId" component={SysField.CustomerId} />
        <FormItem label="数量" name="number" component={SysField.Number} />
        <FormItem label="总金额" name="money" component={SysField.Money} />
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
        <Column title="订购客户" dataIndex="customerId" />
        <Column title="数量" dataIndex="number" />
        <Column title="总金额" dataIndex="money" />
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
    </>
  );
};

export default ProductOrderList;
