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
  customerBatchDelete,
  customerDelete, customerList,
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import {useHistory} from 'ice';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import Table from '@/components/Table';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';

const {Column} = AntTable;
const {FormItem} = Form;

const CustomerTable = (props) => {

  const {status, state,level} = props;
  const history = useHistory();

  const ref = useRef(null);
  const tableRef = useRef(null);

  const [ids, setIds] = useState([]);


  useEffect(() => {
    if (status || state || level) {
      tableRef.current.formActions.setFieldValue('status', status ? status[0] : null);
      tableRef.current.formActions.setFieldValue('classification', state ? state[0] : null);
      tableRef.current.formActions.setFieldValue('customerLevelId', level ? level[0] : null);
      tableRef.current.submit();
    }
  }, [status, state,level]);


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
        <FormItem style={{display: 'none'}} name="status" component={SysField.Name} />
        <FormItem style={{display: 'none'}} name="classification" component={SysField.Name} />
        <FormItem style={{display: 'none'}} name="customerLevelId" component={SysField.Name} />
      </>
    );
  };

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
    ...customerBatchDelete
    }} onSuccess={()=>{
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
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
        footer={footer}
        onChange={(keys) => {
          setIds(keys);
        }}
        scroll={{x:1200}}
      >
        <Column title="客户名称" dataIndex="customerName" render={(text, record, index) => {
          return (
            <Button size="small" type="link" onClick={() => {
              history.push(`/CRM/customer/${record.customerId}`);
            }}>{text}</Button>
          );
        }} />
        <Column title="客户状态" width={120} render={(text, record) => {
          return (
            <BadgeState state={record.status} text={['潜在客户', '正式客户']} color={['red', 'green']} />
          );
        }} />
        <Column title="客户级别" width={120} dataIndex="lname" />
        <Column title="客户分类" width={120} dataIndex="classificationName" />
        <Column title="公司类型" width={200} dataIndex="companyType" ellipsis />
        <Column title="客户来源" width={120} dataIndex="oname" />
        <Column title="负责人" width={120} dataIndex="userName" />
        <Column title="行业" width={120} dataIndex="industryName" />
        <Column title="操作" width={100} align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.customerId);
              }} />
              <DelButton api={{ url: '/customer/batchDelete',
                method: 'POST',
                rowKey:'customerId'}} value={record.customerId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal2 width={1000} title="客户" component={CustomerEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CustomerTable;
