/**
 * 客户管理表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy, useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {clientDelete, clientList} from '../clientUrl';
import ClientEdit from '../clientEdit';
import * as SysField from '../clientField';

const {Column} = AntTable;
const {FormItem} = Form;

const ClientList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

 const searchForm = () => {
   return (
     <>
       <FormItem label="客户名称" name="clientName" component={SysField.ClientName}/>
       <FormItem label="公司类型" name="companyType" component={SysField.CompanyType}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={clientList}
        rowKey="clientId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="clientName"/>
        <Column title="成立时间" dataIndex="setup"/>
        <Column title="法定代表人" dataIndex="legal"/>
        <Column title="统一社会信用代码" dataIndex="utscc"/>
        <Column title="公司类型" dataIndex="companyType"/>
        <Column title="营业期限" dataIndex="businessTerm"/>
        <Column title="注册地址" dataIndex="signIn"/>
        <Column title="简介" dataIndex="introduction"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.clientId);
              }}/>
              <DelButton api={clientDelete} value={record.clientId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={1500} title="编辑" component={ClientEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ClientList;
