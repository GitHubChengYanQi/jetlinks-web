/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deliveryDelete, deliveryList} from '../outstockUrl';
import * as SysField from '../outstockField';
import Breadcrumb from '@/components/Breadcrumb';
import DeliveryEdit from '@/pages/DaoXinSTOCK/outstock/outstockEdit';
import Modal2 from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const DeliveryList = () => {
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
       <FormItem label="物品名称" name="name" component={SysField.StockId}/>
       <FormItem label="出库时间" name="deliveryTime" component={SysField.DeliveryTime}/>
       <FormItem label="品牌名称" name="brandName" component={SysField.StockId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={deliveryList}
        rowKey="outstockId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物品名称" dataIndex="name"/>
        <Column title="出库时间" dataIndex="deliveryTime"/>
        <Column title="出库数量" dataIndex="number"/>
        <Column title="出库价格" dataIndex="price"/>
        <Column title="品牌名称" dataIndex="brandName"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outstockId);
              }}/>
              <DelButton api={deliveryDelete} value={record.outstockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 title="编辑" component={DeliveryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default DeliveryList;
