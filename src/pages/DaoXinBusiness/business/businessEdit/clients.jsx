import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/DaoxinBOM/items/itemsField';
import Table from '@/components/Table';
import CheckButton from '@/components/CheckButton';
import {items, places, stockAdd, stockDetail, stockEdit} from '@/pages/DaoXinSTOCK/stock/stockUrl';
import {ClientList} from '@/pages/DaoXinBusiness/business/businessUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const Clients = (props) => {
  const {ckeck} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="客户名称" name="name" component={SysField.Name}/>
        <FormItem label="公司类型" name="companyType" component={SysField.CompanyType}/>
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
        api={ClientList}
        rowKey="itemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="name"/>
        <Column title="客户地址id" dataIndex="adressId"/>
        <Column title="联系人id" dataIndex="contactsId"/>
        <Column title="固定电话" dataIndex="tel"/>
        <Column title="成立时间" dataIndex="setup"/>
        <Column title="法定代表人" dataIndex="legal"/>
        <Column title="统一社会信用代码" dataIndex="utscc"/>
        <Column title="公司类型" dataIndex="companyType"/>
        <Column title="营业期限" dataIndex="businessTerm"/>
        <Column title="注册地址" dataIndex="signIn"/>
        <Column title="简介" dataIndex="introduction"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                setVal(record.clientId);
                ckeck(record.clientId);
              }}
              />
            </>
          );
        }}/>
      </Table>
    </>
  );
};

export default Clients;
