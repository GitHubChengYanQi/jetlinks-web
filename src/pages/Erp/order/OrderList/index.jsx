/**
 * 订单表列表页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';
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

const {Column} = AntTable;
const {FormItem} = Form;

const OrderList = (props) => {

  const {customerId} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);

  const [search,{toggle}]  = useBoolean(false);

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
          <FormItem mega-props={{span: 1}} placeholder="订单人姓名" name="name" component={SysField.Name} />
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
        rowKey="id"
        SearchButton={Search()}
        layout={search}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="合同名称" fixed dataIndex="contractName"/>
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
        <Column title="甲方联系地址"  width={120}  dataIndex="partyAAdressId" render={(value,record)=>{
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
        <Column title="乙方联系地址"  width={120}  dataIndex="partyBAdressId" render={(value,record)=>{
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
        <Column title="产品名称" width={120} dataIndex="itemId"  />
        <Column title="订单数量" width={120} align='center' dataIndex="number" />
        <Column title="金额" width={120} align='center' dataIndex="price"  sorter />
        <Column title="订单状态" width={120} align='center' dataIndex="state"   sorter/>
        <Column title="订单时间" width={200} dataIndex="orderTime" sorter/>
        {/*<Column title="操作" fixed="right" width={100} align="right" render={(value, record) => {*/}
        {/*  return (*/}
        {/*    <>*/}
        {/*      <EditButton onClick={() => {*/}
        {/*        ref.current.open(record.orderId);*/}
        {/*      }} />*/}
        {/*      <DelButton api={orderDelete} value={record.orderId} onSuccess={() => {*/}
        {/*        tableRef.current.refresh();*/}
        {/*      }} />*/}
        {/*    </>*/}
        {/*  );*/}
        {/*}} />*/}
      </Table>
      <Modal2 width={800} title="订单" component={OrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OrderList;
