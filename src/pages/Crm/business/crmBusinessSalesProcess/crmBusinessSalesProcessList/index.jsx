/**
 * 销售流程列表页
 *
 * @author
 * @Date 2021-08-02 15:47:16
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Card, Popover, Switch, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {
  crmBusinessSalesProcessDelete,
  crmBusinessSalesProcessEdit,
  crmBusinessSalesProcessList
} from '../crmBusinessSalesProcessUrl';
import CrmBusinessSalesProcessEdit from '../crmBusinessSalesProcessEdit';
import * as SysField from '../crmBusinessSalesProcessField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import Detail from '@/pages/Crm/business/crmBusinessSalesProcess/components/Detail';
import PlanEdit from '@/pages/Crm/business/crmBusinessSalesProcess/plan/planEdit';
import {useRequest} from '@/util/Request';
import {crmBusinessDetailedEdit} from '@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedUrl';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActions = createFormActions();

const CrmBusinessSalesProcessList = (props) => {
  const {value} = props;

  const {run} = useRequest(crmBusinessSalesProcessEdit, {manual: true});

  const refDetail = useRef(null);
  const refPlan = useRef();

  const ref = useRef(null);
  const tableRef = useRef(null);

  const Switchs = (value,record) => {
    return (
      <Switch
        checkedChildren="开启跟进计划"
        unCheckedChildren="关闭跟进计划"
        defaultChecked={value}
        onClick={async (value) => {
          if (value) {
            refPlan.current.open(record.salesProcessId);
          } else {
            await run({
              data: {
                salesProcessId: record.salesProcessId,
                plan: null
              }
            });
          }
        }} />
    );
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

  const searchForm = () => {
    return (
      <>
        <FormItem label="流程名称" name="name" component={SysField.SalesId} />
        <FormItem style={{display: 'none'}} value={value} name="salesId" component={SysField.SalesId} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb title="销售流程" />}
        api={crmBusinessSalesProcessList}
        rowKey="salesProcessId"
        formActions={formActions}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="流程名称" dataIndex="name" width={100} align="center" render={(value, record) => {
          return (
            <Button type="link" onClick={() => {
              refDetail.current.open(record);
            }}>{value}</Button>
          );
        }} />
        <Column width={100} title="盈率" dataIndex="percentage" />
        <Column width={100} title="跟进计划" dataIndex="plans" render={(value, record) => {
          return (
            <>
              { value ? <Popover placement="right" content={<Button type="link" style={{padding: 0}} onClick={() => {
                refPlan.current.open(record.salesProcessId);
              }}>查看跟进计划</Button>} trigger="hover">
                {Switchs(value,record)}
              </Popover> : Switchs(value,record)}
            </>
          );
        }} />
        <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.salesProcessId);
              }} />
              <DelButton api={crmBusinessSalesProcessDelete} value={record.salesProcessId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Drawer width={800} title="流程明细" component={CrmBusinessSalesProcessEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal onSuccess={() => {
        tableRef.current.refresh();
        refDetail.current.close();
      }} ref={refDetail} component={Detail} />
      <Modal onSuccess={() => {
        tableRef.current.refresh();
        refPlan.current.close();
      }} ref={refPlan} component={PlanEdit} />
    </>
  );
};

export default CrmBusinessSalesProcessList;
