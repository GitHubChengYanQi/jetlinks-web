/**
 * 产品订单列表页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useEffect, useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal as AntModal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productOrderDelete, productOrderEdit, productOrderList} from '../../productOrderUrl';
import ProductOrderEdit from '../../productOrderEdit';
import * as SysField from '../../productOrderField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProductOrderDetailsList from '@/pages/Erp/productOrderDetails/productOrderDetailsList';
import {useHistory} from 'ice';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';
import {Number} from '../../productOrderField';
import {useRequest} from '@/util/Request';
import {contractEdit} from '@/pages/Crm/contract/ContractUrl';
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {Column} = AntTable;
const {FormItem} = Form;

const ProductOrderTable = (props) => {

  const {state, ...other} = props;

  const ref = useRef(null);
  const refDetail = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '修改成功！' : '修改失败！',
    });
  };

  const {run} = useRequest(productOrderEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    },
    onError:()=>{
      openNotificationWithIcon('error');
    }
  });


  const confirmOk = (record) => {
    AntModal.confirm({
      title: '请确认客户已经付款！',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await run(
          {
            data: {
              ...record,
              state: 1,
            }
          }
        );
      }
    });
  };

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  useEffect(() => {
    if (state) {
      tableRef.current.formActions.setFieldValue('state', state[0]);
      tableRef.current.submit();
    }
  }, [state]);

  const searchForm = () => {
    return (
      <>
        <FormItem label="订购客户" style={{width: 200}} name="customerId" component={SysField.Customer} />
        <FormItem name="state" hidden component={SysField.State} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={productOrderList}
        rowKey="productOrderId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        {...other}
      >
        <Column title="订单号" dataIndex="productOrderId" render={(value, record) => {
          return (
            <Button type="link" onClick={() => {
              refDetail.current.open(record);
            }}>{value}</Button>
          );
        }} />
        <Column title="订购客户" dataIndex="customerId" render={(value, record) => {
          return (
            <Button type="text" style={{padding: 0}} onClick={() => {
              history.push(`/CRM/customer/${value}`);
            }}>{record.customerResult && record.customerResult.customerName}</Button>
          );
        }} />
        <Column title="联系人" dataIndex="customerId" render={(value, record) => {
          return (
            <>
              {record.contactsResult && record.contactsResult.contactsName}
            </>
          );
        }} />
        <Column title="数量" dataIndex="number" />
        <Column title="总金额" dataIndex="money" />
        <Column title="状态" dataIndex="state" render={(value) => {
          return (
            <>
              <BadgeState state={value} text={['未付款', '已付款']} color={['red', 'green']} />
            </>
          );
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {!record.state &&
              <>
                <Button type="link" onClick={() => {
                  confirmOk(record);
                }}>付款</Button>
                <DelButton api={productOrderDelete} value={record.productOrderId} onSuccess={() => {
                  tableRef.current.refresh();
                }} />
              </>}
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={1100} title="订单" component={ProductOrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

      <Modal width={800} headTitle="订单详情" component={ProductOrderDetailsList} onSuccess={() => {
        tableRef.current.refresh();
        refDetail.current.close();
      }} ref={refDetail} />
    </>
  );
};

export default ProductOrderTable;
