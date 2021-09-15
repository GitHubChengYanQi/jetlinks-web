/**
 * 出库申请列表页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {outstockApplyEdit, outstockApplyList} from '../outstockApplyUrl';
import OutstockApplyEdit from '../outstockApplyEdit';
import * as SysField from '../outstockApplyField';
import {useRequest} from '@/util/Request';
import {outstock, outstockOrderDelete} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import Message from '@/components/Message';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockApplyList = () => {
  const ref = useRef(null);
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
        <FormItem label="申请状态" name="applyState" component={SysField.ApplyState} />
        <FormItem label="品牌id" name="brandId" component={SysField.BrandId} />
        <FormItem label="产品id" name="itemId" component={SysField.ItemId} />
      </>
    );
  };

  const {run} = useRequest(outstockApplyEdit, {
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
      message: type === 'success' ? '申请成功！' : '已申请！',
    });
  };

  function confirmOk(record) {
    Modal.confirm({
      title: '发货申请',
      centered: true,
      content: `请确认是否同意发货申请操作!注意：同意之后不可恢复。`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        record.applyState = 2;
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
        title={<Breadcrumb />}
        api={outstockApplyList}
        rowKey="outstockApplyId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品" dataIndex="itemId" />
        <Column title="品牌" dataIndex="brandId" />
        <Column title="数量" dataIndex="number" />
        <Column title="申请状态" dataIndex="applyState" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.applyState === 1 ? <Button style={{margin: '0 10px'}} onClick={() => {
                confirmOk(record);
              }}><Icon type="icon-chuku" />同意</Button> : null}
              {record.applyState === 1 ? <EditButton onClick={() => {
                ref.current.open(record.outstockOrderId);
              }} /> : null}
              {record.applyState === 1 ?
                <DelButton api={outstockOrderDelete} value={record.outstockOrderId} onSuccess={() => {
                  tableRef.current.refresh();
                }} /> : null}
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={OutstockApplyEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OutstockApplyList;
