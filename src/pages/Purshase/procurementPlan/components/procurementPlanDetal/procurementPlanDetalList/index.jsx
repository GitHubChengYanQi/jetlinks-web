/**
 * 采购计划单子表整合数据后的子表列表页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef, useState} from 'react';
import {createFormActions} from '@formily/antd';
import {Badge, Button, notification, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import { procurementPlanDetalList} from '../procurementPlanDetalUrl';
import * as SysField from '../procurementPlanDetalField';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Modal from '@/components/Modal';
import CreateProcurementOrder from '@/pages/Purshase/procurementPlan/components/procurementPlanDetal/components/CreateProcurementOrder';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ProcurementPlanDetalList = ({value}) => {
  const ref = useRef(null);
  const createOrderRef = useRef(null);
  const tableRef = useRef(null);
  const compoentRef = useRef(null);
  const [items, setItems] = useState([]);
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
        <FormItem name="planId" value={value && value.procurementPlanId} component={SysField.PlanId} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        headStyle={{display: 'none'}}
        api={procurementPlanDetalList}
        rowKey="detailId"
        getCheckboxProps={(record) => ({
          disabled: value.status === 97 || record.status === 99,
        })}
        formActions={formActionsPublic}
        searchForm={searchForm}
        onChange={(value, record) => {
          setItems(record);
        }}
        footer={() => <Button disabled={items.length === 0} type="link" onClick={() => {
          createOrderRef.current.open(items);
        }}>{value.status === 97 ? '已拒绝' : '创建采购单'}</Button>}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物料" dataIndex="skuResult" render={(value) => {
          return value && <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="数量" dataIndex="total" width={100} align="center" />
        <Column title="状态" dataIndex="status" width={100} align="center" render={(value) => {
          return value !== 0 ? <Badge text="已完成" color="green" /> : <Badge text="未完成" color="red" />;
        }} />
      </Table>

      <Modal
        width={1300}
        palnId={value.procurementPlanId}
        compoentRef={compoentRef}
        footer={<Button type="primary" onClick={() => {
          compoentRef.current.create();
        }}>创建</Button>}
        component={CreateProcurementOrder}
        ref={createOrderRef}
        onSuccess={() => {
          setItems([]);
          tableRef.current.submit();
          createOrderRef.current.close();
          notification.success({
            message: '成功创建采购单！',
          });
        }} />
    </>
  );
};

export default ProcurementPlanDetalList;
