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
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {orderDelete, orderList} from '../OrderUrl';
import OrderEdit from '../OrderEdit';
import * as SysField from '../OrderField';
import './index.scss';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';

const {Column} = AntTable;
const {FormItem} = Form;

const OrderList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);

  const [search,{toggle}]  = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="订单编号" name="orderId" component={SysField.OrderId} />
          <FormItem mega-props={{span: 1}} placeholder="订单人姓名" name="name" component={SysField.Name} />
          <FormItem mega-props={{span: 1}} placeholder="订单状态" name="state" component={SysField.State} />
        </>
      );
    };


    return (
      <div style={{maxWidth:800}} >
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
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
        <Column title="订单编号" dataIndex="orderId" />
        <Column title="客户编号" dataIndex="customerId" />
        <Column title="订单人姓名" dataIndex="contactsId"  sorter/>
        <Column title="订单地址" dataIndex="adressId" />
        <Column title="订单数量" dataIndex="number" />
        <Column title="订单状态" dataIndex="state"   sorter/>
        <Column title="联系电话" dataIndex="phone" />
        <Column title="订单时间" dataIndex="orderTime" sorter/>
        <Column title="付款时间" dataIndex="payTime" sorter />
        <Column title="发货时间" dataIndex="deliveryId" sorter/>
        <Column title="产品名称" dataIndex="itemId"   />
        <Column title="金额" dataIndex="stockItemId"  sorter />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.orderId);
              }} />
              <DelButton api={orderDelete} value={record.orderId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={800} title="编辑" component={OrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OrderList;
