/**
 * 套餐表列表页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {erpPackageDelete, erpPackageList} from '../erpPackageUrl';
import ErpPackageEdit from '../erpPackageEdit';
import * as SysField from '../erpPackageField';

const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageList = () => {
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
       <FormItem label="产品名称" name="productName" component={SysField.ProductName}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={erpPackageList}
        rowKey="packageId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="productName"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.packageId);
              }}/>
              <DelButton api={erpPackageDelete} value={record.packageId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ErpPackageEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ErpPackageList;
