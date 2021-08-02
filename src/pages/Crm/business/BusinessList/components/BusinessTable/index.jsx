/**
 * 商机管理列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy, useRef} from 'react';
import Table from '@/components/Table';
import {Button, PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import { businessDelete, businessList} from '@/pages/Crm/business/BusinessUrl';
import * as SysField from '@/pages/Crm/business/BusinessField';
import {useHistory} from 'ice';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTable = () => {

  const history = useHistory();

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
        <FormItem label="商机编号" name="BusicessId" component={SysField.BusicessIdListSelect} />
        <FormItem label="商机名称" name="businessName" component={SysField.BusicessName} />
        <FormItem label="客户名称" name="customerName" component={SysField.customerName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={businessList}
        rowKey="businessId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="商机名称" dataIndex="BusicessName" render={(text, record, index)=>{
          return (
            <Button type="link" onClick={()=>{
              history.push(`/CRM/business/${record.BusicessName}`);
            }}>{text}</Button>
          );
        }} />
        <Column title="商机名称" dataIndex="businessName" />
        <Column title="负责人" dataIndex="person" />
        <Column title="客户名称" dataIndex="customerName" />
        <Column title="物品名称" dataIndex="itemName" />
        <Column title="机会来源" dataIndex="name" />
        <Column title="立项日期" dataIndex="time" />
        <Column title="结单日期" dataIndex="statementTime" />
        <Column title="赢率" dataIndex="salesProcessId" />
        <Column title="阶段变更时间" dataIndex="changeTime" />
        <Column title="商机金额" dataIndex="opportunityAmount" />
        <Column title="商机状态" dataIndex="state" />
        <Column title="销售流程" dataIndex="salesName" />
        <Column title="产品合计" dataIndex="totalProducts" />
        <Column title="整单折扣" dataIndex="orderDiscount" />
        <Column title="输单原因" dataIndex="reason" />
        <Column title="商机阶段" dataIndex="stage" />
        <Column title="主线索" dataIndex="mainCable" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.businessId);
              }} />
              <DelButton api={businessDelete} value={record.businessId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={1500}  title="编辑" component={BusinessEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default BusinessTable;


