/**
 * 商机管理列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy, useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {businessDelete, businessList, CustomerNameListSelect} from '@/pages/Crm/business/BusinessUrl';
import * as SysField from '@/pages/Crm/business/BusinessField';
import {useHistory} from 'ice';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import {BusinessNameListSelect, CustomerNameListSelect1} from '@/pages/Crm/business/BusinessField';
import {Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTable = (props) => {

  const {status, state} = props;


  const history = useHistory();

  const ref = useRef(null);
  const tableRef = useRef(null);


  useEffect(() => {
    if (status || state) {
      tableRef.current.formActions.setFieldValue('salesId', status ? status[0] : null);
      tableRef.current.formActions.setFieldValue('originId', state ? state[0] : null);
      tableRef.current.submit();
    }
  }, [status, state]);

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
        <FormItem style={{display: 'none'}} name="salesId" component={SysField.BusinessNameListSelect} />
        <FormItem style={{display: 'none'}} name="originId" component={SysField.BusinessNameListSelect} />
        <FormItem label="商机名称" name="businessName" component={SysField.BusinessNameListSelect} />
        <FormItem label="客户名称" name="customerName" component={SysField.BusinessNameListSelect} />
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
        <Column title="商机名称" dataIndex="businessName" render={(text, record, index) => {
          return (
            <Button type="link" onClick={() => {
              history.push(`/CRM/business/${record.businessId}`);
            }}>{text}</Button>
          );
        }} />
        <Column title="客户名称" dataIndex="customerName" render={(value, record) => {
          return (
            <div>
              {
                record.customer ? record.customer.customerName : null
              }
            </div>
          );
        }} />
        <Column title="销售流程" dataIndex="salesId" render={(value, record) => {
          return (
            <div>
              {
                record.sales ? record.sales.name : null
              }
            </div>
          );
        }} />
        <Column title="机会来源" dataIndex="originName" render={(value, record) => {
          return (
            <div>
              {
                record.origin ? record.origin.originName : null
              }
            </div>
          );
        }} />
        <Column title="负责人" dataIndex="person" render={(value, record) => {
          return (
            <div>
              {
                record.user ? record.user.account : null
              }
            </div>
          );
        }} />
        <Column title="立项日期" dataIndex="time" />
        <Column title="商机阶段" dataIndex="stage" />
        <Column title="商机金额" dataIndex="opportunityAmount" />
        <Column title="结单日期" dataIndex="statementTime" />
        <Column title="阶段变更时间" dataIndex="changeTime" />
        <Column title="阶段状态" dataIndex="state" />
        <Column title="产品合计" dataIndex="totalProducts" />
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
      <Modal2 width={1500} title="编辑" component={BusinessEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default BusinessTable;


