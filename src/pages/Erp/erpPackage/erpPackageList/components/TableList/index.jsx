import React, {useRef, useState, useEffect} from 'react';
import {Button, Table as AntTable} from 'antd';
import Table from "@/pages/Crm/customer/CustomerDetail/compontents/Table";
import * as SysField from "@/pages/Erp/erpPackage/erpPackageField";
import Form from "@/components/Form";
import {erpPackageTableList} from "@/pages/Erp/erpPackageTable/erpPackageTableUrl";

const {FormItem} = Form;
const {Column} = AntTable;


const TableList = (props) => {
  const {value} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem  style={{'display': 'none'}} name="packageId" value={value} component={SysField.packageId}/>
      </>
    );
  };

  return (
    <>
      <Table
        api={erpPackageTableList}
        rowKey="id"
        value={value}
        ref={tableRef}
        searchForm={searchForm}
        showSearchButton={false}
      >
        <Column title="产品名称" dataIndex="items" render={(value, record)=>{
          return (
            <div>
              {
                record.itemsResult ? record.itemsResult.name : null
              }
            </div>
          );
        }} />
        <Column title="销售单价" dataIndex="salePrice"/>
        <Column title="数量" dataIndex="quantity"/>
        <Column title="小计" dataIndex="totalPrice"/>
      </Table>
    </>
  );
};
export default TableList;
