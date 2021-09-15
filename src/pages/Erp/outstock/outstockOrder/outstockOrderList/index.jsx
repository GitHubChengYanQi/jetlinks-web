/**
 * 出库单列表页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal as AntModal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Breadcrumb from '@/components/Breadcrumb';
import OutstockList from '@/pages/Erp/outstock/OutstockList';
import Modal from '@/components/Modal';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import Message from '@/components/Message';
import {outstock, outstockOrderDelete, outstockOrderList} from '../outstockOrderUrl';
import OutstockOrderEdit from '../outstockOrderEdit';
import StockDetailsList from '@/pages/Erp/stockDetails/StockDetailsList';
import OutStock from '@/pages/Erp/outstock/components/OutStock';

const {Column} = AntTable;

const OutstockOrderList = () => {

  const ref = useRef(null);
  const refOutStock = useRef(null);
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


  const {run} = useRequest(outstock, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    },
    onError: (error) => {
      Message.error(error.message);
    }
  });

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '出库成功！' : '已出库！',
    });
  };

  function confirmOk(record) {
    AntModal.info({
      title: '出库',
      closable:true,
      centered: true,
      content: <OutStock value={record.outstockOrderId} />,
      style: {margin: 'auto'},
    });
  }

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={outstockOrderList}
        rowKey="outstockOrderId"
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出库单号" dataIndex="outstockOrderId" render={(text, record) => {
          return <Button type="link" onClick={() => {
            refSee.current.open(record.outstockOrderId);
          }}>{text}</Button>;
        }} />
        <Column title="计划出库时间" dataIndex="time" />
        <Column title="出库状态" width={200} dataIndex="state" render={(text, record) => {
          return (
            <>
              {record.state ? '已出库' : '未出库'}
            </>
          );
        }} />

        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.state === 0 &&<>
                <Button style={{margin: '0 10px'}} onClick={() => {
                  confirmOk(record);
                  // refOutStock.current.open(record.outstockOrderId);
                }}><Icon type="icon-chuku" />出库</Button>
                <EditButton onClick={() => {
                  ref.current.open(record.outstockOrderId);
                }} />
                <DelButton api={outstockOrderDelete} value={record.outstockOrderId} onSuccess={() => {
                  tableRef.current.refresh();
                }} />
              </>}

            </>
          );
        }} width={300} />
      </Table>
      <Modal width={800} title="出库单" component={OutstockOrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={1200} component={StockDetailsList} onSuccess={() => {
        tableRef.current.refresh();
        refSee.current.close();
      }} ref={refSee} />
      <Modal width={800} component={OutStock} onSuccess={() => {
        tableRef.current.refresh();
        refOutStock.current.close();
      }} ref={refOutStock} />
    </>
  );
};

export default OutstockOrderList;
