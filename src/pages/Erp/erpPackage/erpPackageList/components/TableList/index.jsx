import React, {useRef} from 'react';
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
        <FormItem  label='产品名称' name="itemsId" component={SysField.itemId}/>
      </>
    );
  };

  return (
    <>
      <Table
        api={erpPackageTableList}
        rowKey="id"
        ref={tableRef}
        searchForm={searchForm}

      >
        <Column title="产品名称" dataIndex="items" render={(value, record)=>{
          return (
            <div>
              {
                record.items[0] ? record.items[0].name : null
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
