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
import {deliveryDelete, deliveryList, outstockDelete, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import Breadcrumb from '@/components/Breadcrumb';
import DeliveryEdit from '@/pages/Erp/outstock/OutstockEdit';
import Modal2 from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockList = () => {
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
        <FormItem label="产品名称" name="name" component={SysField.StockId}/>
        <FormItem label="出库时间" name="deliveryTime" component={SysField.DeliveryTime}/>
        <FormItem label="品牌名称" name="brandName" component={SysField.StockId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={outstockList}
        rowKey="outstockId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="name" sorter/>
        <Column title="出库时间" dataIndex="deliveryTime" sorter/>
        <Column title="出库数量" dataIndex="number" sorter/>
        <Column title="出库价格" dataIndex="price" sorter/>
        <Column title="品牌名称" dataIndex="brandName" sorter/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outstockId);
              }}/>
              <DelButton api={outstockDelete} value={record.outstockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 title="编辑" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OutstockList;
