import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/items/ItemsField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import CheckButton from '@/components/CheckButton';
import {erpPackageList} from "@/pages/Erp/erpPackage/erpPackageUrl";
import {useRequest} from "@/util/Request";
import TableList from "@/pages/Crm/business/BusinessEdit/components/TableList";

const {Column} = AntTable;
const {FormItem} = Form;

const ItemPackage = (props) => {
  const {allData} = props;

  const [da,setDa] = useState();
  const {data,run} = useRequest({  url: '/erpPackageTable/list', method: 'POST',  rowKey:'packageId',data:da},{manual:true});
  const  tableDate = data;
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
        expandable={{expandedRowRender: record => <TableList value={record.packageId} />}}
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
