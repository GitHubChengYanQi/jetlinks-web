import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/items/ItemsField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import CheckButton from '@/components/CheckButton';
import {erpPackageList} from "@/pages/Erp/package/packageUrl";
import {useRequest} from "@/util/Request";
import TableList from "@/pages/Erp/package/packageList/components/TableList";

const {Column} = AntTable;
const {FormItem} = Form;

const ItemPackage = (props) => {
  const {allData} = props;

  const {data, setData} = useState(null);
  const searchForm = () => {
    return (
      <>
        <FormItem label="套餐名称" name="name" component={SysField.Name} />
      </>
    );
  };
  const [val,setVal] = useState();

  const ref = useRef(null);
  const tableRef = useRef(null);

  return (
    <>
      <Table
        api={erpPackageList}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
        expandable={{
          expandedRowRender: record => <TableList value = {record}/>
        }}
      >
        <Column title="套餐名称" dataIndex="productName" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                setVal(record.itemId);
                allData(record);
              }}
              />
            </>
          );
        }}/>
      </Table>
    </>
  );
};

export default ItemPackage;
