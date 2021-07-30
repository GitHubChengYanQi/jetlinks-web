import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/items/ItemsField';
import Table from '@/components/Table';
import CheckButton from '@/components/CheckButton';
import {clientDelete, clientList, customerList} from '@/pages/Crm/customer/CustomerUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const Index = (props) => {
  const {check} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="客户名称" name="clientName" component={SysField.Name} />
        <FormItem label="公司类型" name="companyType" component={SysField.Name} />
      </>
    );
  };
  const [val,setVal] = useState();

  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>

      </>
    );
  };

  return (
    <>
      <Input value={val}/>
      <Table
        api={customerList}
        rowKey="customerId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="成立时间" dataIndex="setup" />
        <Column title="法定代表人" dataIndex="legal" />
        <Column title="统一社会信用代码" dataIndex="utscc" />
        <Column title="公司类型" dataIndex="companyType" />
        <Column title="营业期限" dataIndex="businessTerm" />
        <Column title="注册地址" dataIndex="signIn" />
        <Column title="简介" dataIndex="introduction" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
              <CheckButton onClick={() => {
                setVal(record.customerId);
                check(record.customerId);
              }} />
          );
        }} width={300} />
      </Table>

    </>
  );
};

export default Index;
