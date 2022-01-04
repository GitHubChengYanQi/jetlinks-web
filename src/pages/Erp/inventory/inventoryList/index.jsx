/**
 * 盘点任务主表列表页
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {inventoryDelete, inventoryList} from '../inventoryUrl';
import InventoryEdit from '../inventoryEdit';
import * as SysField from '../inventoryField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import InventoryDetailList from '@/pages/Erp/inventory/inventoryDetail/inventoryDetailList';

const {Column} = AntTable;
const {FormItem} = Form;

const InventoryList = () => {
  const ref = useRef(null);
  const refDetail = useRef(null);
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
        <FormItem label="盘点任务名称" name="inventoryTaskName" component={SysField.InventoryTaskName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={inventoryList}
        rowKey="inventoryTaskId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="盘点任务编码" dataIndex="coding" render={(value, record) => {
          return <Button type="link" onClick={() => {
            refDetail.current.open(record.inventoryTaskId);
          }}>{value}</Button>;
        }} />
        <Column title="盘点任务名称" dataIndex="inventoryTaskName" />
        <Column title="负责人" dataIndex="userId" />
        <Column title="创建时间" dataIndex="createTime" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.inventoryTaskId);
              }} />
              <DelButton api={inventoryDelete} value={record.inventoryTaskId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={500} title="盘点任务" component={InventoryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={1000} title="盘点任务详情" component={InventoryDetailList} onSuccess={() => {
        refDetail.current.close();
      }} ref={refDetail} />
    </>
  );
};

export default InventoryList;
