/**
 * 采购计划主表列表页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {procurementPlanDelete, procurementPlanList} from '../procurementPlanUrl';
import ProcurementPlanEdit from '../procurementPlanEdit';
import * as SysField from '../procurementPlanField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcurementPlanDetalList
  from '@/pages/Purshase/procurementPlan/components/procurementPlanDetal/procurementPlanDetalList';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementPlanList = () => {
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
        <FormItem label="采购计划名称" name="procurementPlanName" component={SysField.ProcurementPlanName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        rowSelection
        api={procurementPlanList}
        rowKey="procurementPlanId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="采购计划名称" dataIndex="procurementPlanName" render={(value,record)=>{
          return <Button type='link' onClick={()=>{
            ref.current.open(record.procurementPlanId);
          }}>{value}</Button>;
        }} />
        <Column title="创建人" dataIndex="user" render={(value)=>{
          return <>{value && value.name}</>;
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="备注" dataIndex="remark" />
        <Column />
      </Table>
      <Modal width={800} headTitle="采购计划详情" component={ProcurementPlanDetalList} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ProcurementPlanList;
