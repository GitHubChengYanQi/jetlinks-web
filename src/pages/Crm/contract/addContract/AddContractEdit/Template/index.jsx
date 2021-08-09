import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/items/ItemsField';
import Table from '@/components/Table';
import CheckButton from '@/components/CheckButton';
import {items, places, stockAdd, stockDetail, stockEdit} from '@/pages/Erp/stock/StockUrl';
import {ClientList} from '@/pages/Crm/business/BusinessUrl';
import Breadcrumb from '@/components/Breadcrumb';
import {clientDelete, clientList, customerList} from '@/pages/Crm/customer/CustomerUrl';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import {templateList} from '@/pages/Crm/template/TemplateUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const TemplateList = (props) => {
  const {check} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="合同模板" name="name" component={SysField.Name} />
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
        api={templateList}
        rowKey="templateId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="合同模板" dataIndex="name"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
              <CheckButton onClick={() => {
                setVal(record.templateId);
                check(record.content);
              }} />
          );
        }} width={300} />
      </Table>

    </>
  );
};

export default TemplateList;
