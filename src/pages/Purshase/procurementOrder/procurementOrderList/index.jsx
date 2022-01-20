/**
 * 采购单列表页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Badge, Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {procurementOrderDelete, procurementOrderList} from '../procurementOrderUrl';
import ProcurementOrderEdit from '../procurementOrderEdit';
import * as SysField from '../procurementOrderField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcurementOrderDetailList
  from '@/pages/Purshase/procurementOrder/components/procurementOrderDetail/procurementOrderDetailList';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementOrderList = () => {
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
        <FormItem name="status" component={SysField.Status} />
      </>
    );
  };

  return (
    <>
      <Table
        rowSelection
        title={<Breadcrumb />}
        api={procurementOrderList}
        rowKey="procurementOrderId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="采购单" dataIndex="procurementOrderId" render={(value)=>{
          return<Button type='link' onClick={()=>{
            ref.current.open(value);
          }}>{value}</Button>;
        }} />
        <Column title="状态" dataIndex="status" render={(value)=>{
          switch (value) {
            case 0:
              return <Badge text="审批中" color="yellow" />;
            case 97:
              return <Badge text="已拒绝" color="red" />;
            case 99:
              return <Badge text="已同意" color="green" />;
            default:
              break;
          }
        }} />
        <Column />
      </Table>
      <Modal width={1000} headTitle="采购单详情" component={ProcurementOrderDetailList} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ProcurementOrderList;
