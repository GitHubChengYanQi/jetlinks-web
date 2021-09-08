/**
 * 订单表列表页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import './index.scss';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import OrderEdit from '../OrderEdit';
import {orderDelete, orderList} from '../OrderUrl';
import * as SysField from '../OrderField';
import {CustomerListSelect} from '../OrderField';
import OrderDetailsList from "@/pages/Erp/orderDetails/orderDetailsList";

const {Column} = AntTable;
const {FormItem} = Form;

const OrderList = (props) => {

  const {customerId} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);
  const orderDetailRef = useRef(null);

  const [search,{toggle}]  = useBoolean(false);
  const [value, setValue] = useState(null);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="订单状态" name="state" component={SysField.State} />
          {
            customerId ? null :  <FormItem mega-props={{span: 1}} placeholder="客户名称"  value={customerId || null} name="customerId" component={SysField.CustomerListSelect} />
          }
        </>
      );
    };

    return (
      <div style={{maxWidth:800}} >
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="合同名称" name="contractName" component={SysField.contractName} />
          {search ? formItem() : null}
        </MegaLayout>
      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search?'收起':'高级'}</Button>
            <MegaLayout inline>
              {
                customerId ?  <FormItem mega-props={{span: 1}} placeholder="客户名称"  hidden value={customerId || null} name="customerId" component={SysField.CustomerListSelect} /> : null
              }
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>

      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={orderList}
        rowKey="order_id"
        isModal={false}
        SearchButton={Search()}
        layout={search}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="合同名称" fixed dataIndex="contractName" render={(value,record)=>{
          return (
            <Button type="link" onClick={() => {
              orderDetailRef.current.open(record.orderId);
            }}>{record.contractName}</Button>
          );
        }} sorter/>
        <Column title="甲方" width={120} dataIndex="partyA" render={(value,record)=>{
          return (
            <div>
              {
                record.partA ? record.partA.customerName : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="甲方联系人"  width={120}  dataIndex="partyAContactsId" render={(value,record)=>{
          return (
            <div>
              {
                record.partyAContacts ? record.partyAContacts.contactsName : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="甲方联系地址"  width={200}  dataIndex="partyAAdressId" render={(value,record)=>{
          return (
            <div>
              {
                record.partyAAdress ? record.partyAAdress.location : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="甲方联系人电话"  width={150}  dataIndex="partyAPhone" render={(value,record)=>{
          return (
            <div>
              {
                record.phoneA ? record.phoneA.phoneNumber : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="乙方"  width={120}  dataIndex="partyB" render={(value,record)=>{
          return (
            <div>
              {
                record.partB ? record.partB.customerName : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="乙方联系人"  width={120}  dataIndex="partyBContactsId" render={(value,record)=>{
          return (
            <div>
              {
                record.partyBContacts ? record.partyBContacts.contactsName : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="乙方联系地址"  width={200}  dataIndex="partyBAdressId" render={(value,record)=>{
          return (
            <div>
              {
                record.partyBAdress ? record.partyBAdress.location : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="乙方联系人电话"  width={150}  dataIndex="partyBPhone" render={(value,record)=>{
          return (
            <div>
              {
                record.phoneB ? record.phoneB.phoneNumber : ''
              }
            </div>
          );
        }} sorter/>
        <Column title="订单状态" width={120} align='center' dataIndex="state"   sorter/>
        <Column title="订单时间" width={200} dataIndex="orderTime" sorter/>
      </Table>
      <Modal2 width={1200} title="订单" component={OrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal2 width={1200} title="订单明细" component={OrderDetailsList} onSuccess={() => {
        orderDetailRef.current.refresh();
        ref.current.close();
      }} ref={orderDetailRef} />
    </>
  );
};

export default OrderList;
