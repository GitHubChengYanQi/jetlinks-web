/**
 * 出库单列表页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button,Table as AntTable} from 'antd';
import AddButton from '@/components/AddButton';
import Breadcrumb from '@/components/Breadcrumb';
import OutstockList from '@/pages/Erp/outstock/OutstockList';
import Modal from '@/components/Modal';
import {outstockOrderList} from '../outstockOrderUrl';
import OutstockOrderEdit from '../outstockOrderEdit';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;

const OutstockOrderList = () => {

  const ref = useRef(null);
  const refSee = useRef(null);
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

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={outstockOrderList}
        rowKey="outstockOrderId"
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出库单号" dataIndex="coding" render={(text, record) => {
          return <>
            <Code source="outstock" id={record.outstockOrderId} />
            <Button type="link" onClick={() => {
              refSee.current.open(record);
            }}>{text}</Button>
          </>;
        }} />
        <Column title="仓库" dataIndex="storehouseId" render={(text, record) => {
          return (
            <>
              {record.storehouseResult && record.storehouseResult.name}
            </>
          );
        }} />
        <Column title="负责人" dataIndex="userId" render={(text, record) => {
          return (
            <>
              {record.userResult && record.userResult.name}
            </>
          );
        }} />
        <Column title="备注" dataIndex="note" />
        <Column />
      </Table>
      <Modal width={1000} title="出库单" component={OutstockOrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={1200} component={OutstockList} onSuccess={() => {
        tableRef.current.refresh();
        refSee.current.close();
      }} ref={refSee} />
    </>
  );
};

export default OutstockOrderList;
