/**
 * 出库单列表页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';

import Modal2 from '@/components/Modal';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import Message from '@/components/Message';
import {outstock, outstockOrderDelete, outstockOrderEdit, outstockOrderList} from '../outstockOrderUrl';
import OutstockOrderEdit from '../outstockOrderEdit';

const {Column} = AntTable;

const OutstockOrderList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
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
    Modal.confirm({
      title: '出库',
      centered: true,
      content: `请确认是否执行出库操作!注意：出库之后不可恢复。`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        record.state = 1;
        await run(
          {
            data: record
          }
        );
      }
    });
  }

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={outstockOrderList}
        rowKey="outstockOrderId"
        // searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出库单号" dataIndex="outstockOrderId"/>
        <Column title="计划出库时间" dataIndex="time"/>
        <Column title="出库状态" width={200} dataIndex="state" render={(text, record) => {
          return (
            <>
              {record.state ? '已出库':'未出库'}
            </>
          );
        }} />

        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.state === 0 ? <Button style={{margin: '0 10px'}} onClick={() => {
                confirmOk(record);
              }}><Icon type="icon-chuku" />出库</Button>: null}
              {record.state === 0 ? <EditButton onClick={() => {
                ref.current.open(record.outstockOrderId);
              }}/> : null }
              {record.state === 0 ? <DelButton api={outstockOrderDelete} value={record.outstockOrderId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/> : null }
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={1200} title="出库单" component={OutstockOrderEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OutstockOrderList;
