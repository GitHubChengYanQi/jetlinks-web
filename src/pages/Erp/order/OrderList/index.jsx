/**
 * 订单表列表页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import { Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {orderDelete, orderList} from '../OrderUrl';
import OrderEdit from '../OrderEdit';
import * as SysField from '../OrderField';
import './index.scss';

const {Column} = AntTable;
const {FormItem} = Form;

const OrderList = () => {
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

        <FormItem label="订单编号" name="orderId" component={SysField.OrderId} />
        <FormItem label="订单人姓名" name="name" component={SysField.Name} />
        <div className="state">
          <FormItem label="订单状态" name="state" component={SysField.State} />
        </div>


      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={orderList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >

        <Column title="订单编号" dataIndex="orderId" />
        <Column title="客户编号" dataIndex="customerId" />
        <Column title="订单人姓名" dataIndex="contactsId"  sorter showSorterTooltip={false} sortDirections={['ascend', 'descend']}/>
        <Column title="订单地址" dataIndex="adressId" />
        <Column title="订单数量" dataIndex="number" />
        <Column title="订单状态" dataIndex="state"   sorter showSorterTooltip={false} sortDirections={['ascend', 'descend']}/>
        <Column title="联系电话" dataIndex="clientId" />
        <Column title="订单时间" dataIndex="orderTime" sorter showSorterTooltip={false} defaultSortOrder='descend' sortDirections={['ascend', 'descend']}/>
        <Column title="付款时间" dataIndex="payTime" sorter showSorterTooltip={false} defaultSortOrder='descend' sortDirections={['ascend', 'descend']}/>
        <Column title="发货时间" dataIndex="deliveryId" sorter showSorterTooltip={false} defaultSortOrder='descend' sortDirections={['ascend', 'descend']}/>
        <Column title="产品名称" dataIndex="itemId"   />
        <Column title="金额" dataIndex="stockItemId"  sorter showSorterTooltip={false} sortDirections={['ascend', 'descend']}  />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.orderId);
              }} />
              <DelButton api={orderDelete} value={record.orderId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={800} title="编辑" component={OrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OrderList;
