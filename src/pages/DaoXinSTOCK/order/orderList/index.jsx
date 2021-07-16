/**
 * 发货表列表页
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {orderDelete, orderList} from '../orderUrl';
import OrderEdit from '../orderEdit';
import * as SysField from '../orderField';

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
        }}/>
      </>
    );
  };

 const searchForm = () => {
   return (
     <>
       <FormItem label="出库编号" name="outboundId" component={SysField.OutboundId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={orderList}
        rowKey="orderId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出库编号" dataIndex="outboundId"/>
        <Column title="发货人" dataIndex="consignor"/>
        <Column title="收货地址" dataIndex="shipping"/>
        <Column title="发货价格" dataIndex="price"/>
        <Column title="物品重量" dataIndex="weight"/>
        <Column title="物品面积" dataIndex="area"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.orderId);
              }}/>
              <DelButton api={orderDelete} value={record.orderId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={OrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OrderList;
