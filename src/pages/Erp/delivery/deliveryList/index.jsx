/**
 * 发货表列表页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deliveryDelete, deliveryList} from '../deliveryUrl';
import DeliveryEdit from '../deliveryEdit';
import * as SysField from '../deliveryField';
import Modal2 from '@/components/Modal';
import OutstockList from '@/pages/Erp/outstock/OutstockList';
import DeliveryDetailsList from '@/pages/Erp/deliveryDetails/deliveryDetailsList';
import {useHistory} from 'ice';

const {Column} = AntTable;
const {FormItem} = Form;

const DeliveryList = () => {
  const ref = useRef(null);
  const history = useHistory();
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
        <FormItem label="出库单id" name="outstockOrderId" component={SysField.OutstockOrderId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={deliveryList}
        rowKey="deliveryId"
        searchForm={searchForm}
        // actions={actions()}
        ref={tableRef}
      >
        <Column title="出库单" dataIndex="outstockOrderId" render={(text, record) => {
          return <Button type="link" onClick={() => {
            history.push(`/Erp/delivery/${record.deliveryId}`);
          }}>{text}</Button>;
        }} />
        <Column title="发货时间" dataIndex="outTime" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.deliveryId);
              }} />
              <DelButton api={deliveryDelete} value={record.deliveryId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={DeliveryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default DeliveryList;
