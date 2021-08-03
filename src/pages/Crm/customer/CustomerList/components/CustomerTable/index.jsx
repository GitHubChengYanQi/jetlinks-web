/**
 * 客户管理表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy, useEffect, useRef, useState} from 'react';
import {Button, PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {
  customerDelete, customerList,
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import {useHistory} from 'ice';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const CustomerTable = (props) => {

  const {status,state} = props;




  const history = useHistory();

  const ref = useRef(null);
  const tableRef = useRef(null);

  if (status!==undefined || state !==undefined){
    tableRef.current.formActions.setFieldValue('status', status?status[0] : '');
    tableRef.current.formActions.setFieldValue('classification', state?state[0]:'');
    tableRef.current.submit();
  }


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
        <FormItem label="客户名称" name="customerName" component={SysField.Name} />
        <FormItem label="公司类型" name="companyType" component={SysField.Name} />
        <FormItem style={{display:'none'}} name="status" component={SysField.Name} />
        <FormItem style={{display:'none'}} name="classification" component={SysField.Name} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={customerList}
        rowKey="customerId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="customerName" render={(text, record, index) => {
          return (
            <Button type="link" onClick={() => {
              history.push(`/CRM/customer/${record.customerId}`);
            }}>{text}</Button>
          );
        }} />
        <Column title="公司类型" dataIndex="companyType" />
        <Column title="客户分类" dataIndex="classification" />
        <Column title="客户状态" dataIndex="status" />
        <Column title="客户级别" dataIndex="lname" />
        <Column title="客户来源" dataIndex="oname" />
        <Column title="负责人" dataIndex="userName" />
        <Column title="行业" dataIndex="industryName" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.customerId);
              }} />
              <DelButton api={customerDelete} value={record.customerId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={1000} title="客户" component={CustomerEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CustomerTable;
