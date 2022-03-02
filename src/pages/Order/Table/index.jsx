/**
 * 采购单列表页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {useRef} from 'react';
import {Button, Table as AntTable} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {orderList} from '@/pages/Erp/order/OrderUrl';
import * as SysField from '../SysField/index';

const {Column} = AntTable;
const {FormItem} = Form;

const OrderTable = (props) => {

  const history = useHistory(null);
  const tableRef = useRef(null);

  const module = () => {
    switch (props.location.pathname) {
      case '/CRM/order':
        return {
          createTitle: '创建销售单',
          createRoute: '/CRM/order/createOrder?module=SO',
          module:'SO',
        };
      case '/purchase/order':
        return {
          createTitle: '创建采购单',
          createRoute: '/purchase/order/createOrder?module=PO',
          module:'PO',
        };
      default:
        break;
    }
  };

  const actions = () => {
    return (
      <>
        <Button type="primary" onClick={() => {
          history.push(module().createRoute || '/');
        }}>{module().createTitle || '创建'}</Button>
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="单号" name="status" component={SysField.Coding} />
      </>
    );
  };

  return (
    <>
      <Table
        noRowSelection
        title={<Breadcrumb />}
        api={orderList}
        rowKey="orderId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="采购单编号" dataIndex="coding" />
        <Column title="创建时间" dataIndex="createTime" />
        <Column />
      </Table>

    </>
  );
};

export default OrderTable;
