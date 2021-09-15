/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import {Button, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import {outstockDelete, outstockEdit, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Icon from '@/components/Icon';
import DeliveryDetailsEdit from '@/pages/Erp/deliveryDetails/deliveryDetailsEdit';


const {Column} = AntTable;
const {FormItem} = Form;

const OutstockList = (props) => {

  const {outstockOrderId, value, sourhouse} = props;

  const ref = useRef(null);
  const refDelivery = useRef(null);
  const tableRef = useRef(null);
  const [ids, setIds] = useState();

  const footer = () => {
    return (
      <>
        <Button icon={<Icon type="icon-chuhuo" />} onClick={() => {
          refDelivery.current.open(false);
        }} type="text">批量发货</Button>
        <Modal title="产品出库" component={DeliveryDetailsEdit} onSuccess={() => {
          tableRef.current.refresh();
          refDelivery.current.close();
        }} ref={refDelivery} ids={ids} />
      </>
    );

  };


  const searchForm = () => {


    return (
      <FormItem
        mega-props={{span: 1}}
        placeholder="出库单"
        name="outstockOrderId"
        hidden
        value={outstockOrderId || value}
        component={SysField.ItemIdSelect} />
    );
  };

  return (
    <>
      {value ? <>出库产品</> : <Button style={{width: '100%'}} onClick={() => {
        ref.current.open(false);
      }}>
        添加出库商品
      </Button>}
      <Table
        api={outstockList}
        isModal={false}
        rowKey="outstockId"
        ref={tableRef}
        showSearchButton={false}
        searchForm={searchForm}
        footer={value ? footer : false}
        onChange={(value) => {
          setIds(value);
        }}
      >

        <Column title="产品编号" width={200} dataIndex="stockItemId"  />
        <Column title="产品名称" width={200} dataIndex="itemId" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} />

        <Column title="品牌名称" width={200} dataIndex="brandId" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} />
        {value ? null : <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={outstockDelete} value={record.outstockId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />}
      </Table>
      <Modal title="产品出库" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} outstockOrderId={outstockOrderId} sourhouse={sourhouse} />
    </>
  );
};

export default OutstockList;
