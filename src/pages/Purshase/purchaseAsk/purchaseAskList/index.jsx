/**
 * 采购申请列表页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Badge, Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {purchaseAskDelete, purchaseAskList} from '../purchaseAskUrl';
import PurchaseAskEdit from '../purchaseAskEdit';
import * as SysField from '../purchaseAskField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const PurchaseAskList = () => {
  const ref = useRef(null);
  const compoentRef = useRef(null);
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
        <FormItem label="采购编号" name="coding" component={SysField.SelectCoding} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={purchaseAskList}
        rowKey="purchaseAskId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="编号" dataIndex="coding" />
        <Column title="采购类型" dataIndex="type" />
        <Column title="备注" dataIndex="note" />
        <Column title="申请状态" dataIndex="status" render={(value) => {
          switch (value) {
            case 0:
              return <Badge text="待审核" color="yellow" />;
            case 1:
              return <Badge text="已通过" color="green" />;
            case -1:
              return <Badge text="已拒绝" color="red" />;
            default:
              break;
          }
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.purchaseAskId);
              }} />
              <DelButton api={purchaseAskDelete} value={record.purchaseAskId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal
        width={1300}
        title="编辑"
        compoentRef={compoentRef}
        component={PurchaseAskEdit}
        footer={<>
          <Button
            type="primary"
            onClick={() => {
              compoentRef.current.formRef.current.submit();
            }}
          >发起</Button>
          <Button
            onClick={() => {
              ref.current.close();
            }}>取消</Button>
        </>}
        onSuccess={() => {
          tableRef.current.refresh();
          ref.current.close();
        }} ref={ref} />
    </>
  );
};

export default PurchaseAskList;
