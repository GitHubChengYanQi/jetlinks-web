import React, {useRef, useState, useEffect} from 'react';
import {Button, Table as AntTable} from 'antd';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import * as SysField from "@/pages/Crm/business/BusinessField";
import Form from "@/components/Form";
import {erpPackageTableList} from "@/pages/Erp/erpPackageTable/erpPackageTableUrl";
import {itemId} from "@/pages/Crm/business/BusinessField";

const {FormItem} = Form;
const {Column} = AntTable;
const disabled = true;

const TableList = (props) => {
  const {value} = props;
  console.log(value);
  const ref = useRef(null);
  const tableRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display': 'none'}} name="itemsId" value={value} component={SysField.itemId}/>
      </>
    );
  };

  return (
    <>
      <Table
        api={erpPackageTableList}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
        // disabled={disabled}
      >
        <Column title="产品名称" dataIndex="items"/>
        <Column title="销售单价" dataIndex="salePrice"/>
        <Column title="数量" dataIndex="quantity"/>
        <Column title="小计" dataIndex="totalPrice"/>
      </Table>
    </>
  );
};
export default TableList;
