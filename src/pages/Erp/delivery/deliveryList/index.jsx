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
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const DeliveryList = () => {
  const ref = useRef(null);
  const history = useHistory();
  const tableRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{width:200}} label="客户" name="customerId" component={SysField.Customer} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={deliveryList}
        rowKey="deliveryId"
        isModal={false}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="发货单" dataIndex="deliveryId" render={(text, record) => {
          return <Button type="link" onClick={() => {
            history.push(`/ERP/delivery/${record.deliveryId}`);
          }}>{text}</Button>;
        }} />
        <Column title="客户" dataIndex="customerId" render={(value,record)=>{
          return (
            <>
              {
                record.customerResult && record.customerResult.customerName
              }
            </>
          );
        }}/>
        <Column title="地址" dataIndex="adressId" render={(value,record)=>{
          return (
            <>
              {
                record.adressResult && record.adressResult.location
              }
            </>
          );
        }}/>
        <Column title="联系人" dataIndex="contactsId" render={(value,record)=>{
          return (
            <>
              {
                record.contactsResult && record.contactsResult.contactsName
              }
            </>
          );
        }}/>
        <Column title="电话" dataIndex="phoneId" render={(value,record)=>{
          return (
            <>
              {
                record.phoneResult && record.phoneResult.phoneNumber
              }
            </>
          );
        }}/>
        <Column title="发货时间" dataIndex="createTime" />
      </Table>
      <Drawer width={800} title="编辑" component={DeliveryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default DeliveryList;
