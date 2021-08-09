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

  const {status, state, level} = props;
  const history = useHistory();

  const ref = useRef(null);
  const tableRef = useRef(null);

  const [ids, setIds] = useState([]);

  const [search, setSearch] = useState(false);


  useEffect(() => {
    if (status || state || level) {
      tableRef.current.formActions.setFieldValue('status', status ? status[0] : null);
      tableRef.current.formActions.setFieldValue('classification', state ? state[0] : null);
      tableRef.current.formActions.setFieldValue('customerLevelId', level ? level[0] : null);
      tableRef.current.submit();
    }
  }, [status, state, level]);


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

    const formItem = () => {
      return (
        <>
          <FormItem style={{width:200}} label="公司类型" name="companyType" component={SysField.CompanyType} />
          <FormItem label="客户来源" name="originId" component={SysField.OriginId} />
          <FormItem label="负责人" name="userId" component={SysField.UserName} />
          <FormItem style={{width:200}} label="行业" name="industryId" component={SysField.IndustryOne} />
        </>
      );
    };


    return (
      <>
        <FormItem label="客户名称" name="customerName" component={SysField.Name} />
        {search ? formItem() : null}
        <FormItem hidden name="status" component={SysField.Name} />
        <FormItem hidden name="classification" component={SysField.Name} />
        <FormItem hidden name="customerLevelId" component={SysField.Name} />

        <Button style={{marginRight: 20}} onClick={() => {
          if (search){
            setSearch(false);
          }else {
            setSearch(true);
          }

        }}>高级搜索</Button>
      </>
    );
  };

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...customerBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <div id="listLayout" style={{height:'100%',overflowY:'auto'}}>
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
        scroll={{x:'max-content' }}
        sticky={{
          getContainer:() => {
            return document.getElementById('listLayout');
          }
        }}
      >
        <Column title="客户名称" dataIndex="customerName" render={(text, record, index) => {
          return (
            <Button size="small" type="link" onClick={() => {
              history.push(`/CRM/customer/${record.customerId}`);
            }}>{text}</Button>
          );
        }} />
        <Column title="客户状态" width={120} align='center' render={(text, record) => {
          return (
            <BadgeState state={record.status} text={['潜在客户', '正式客户']} color={['red', 'green']} />
          );
        }} />
        <Column title="客户级别" width={120} align='center' render={(text, record) => {
          return (
            <>
              {record.crmCustomerLevelResult.level}
            </>
          );
        }} />
        <Column title="客户分类" width={120} dataIndex="classificationName" />
        <Column title="公司类型" width={200} dataIndex="companyType" ellipsis />
        <Column title="客户来源" width={120} render={(text, record) => {
          return (
            <>
              {record.originResult.originName}
            </>
          );
        }} />
        <Column title="负责人" width={120} align='center' render={(text, record) => {
          return (
            <>
              {record.userResult.account}
            </>
          );
        }} />
        <Column title="行业" width={120} align='center' render={(text, record) => {
          return (
            <>
              {record.crmIndustryResult.industryName}
            </>
          );
        }} />
        <Column title="操作" width={100} align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.customerId);
              }} />
              <DelButton api={{
                url: '/customer/batchDelete',
                method: 'POST',
                rowKey: 'customerId'
              }} value={record.customerId} onSuccess={() => {
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
    </div>
  );
};

export default CustomerTable;
