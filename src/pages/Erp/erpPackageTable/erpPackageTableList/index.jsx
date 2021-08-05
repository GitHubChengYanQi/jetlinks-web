/**
 * 套餐分表列表页
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
import {erpPackageTableDelete, erpPackageTableList} from '../erpPackageTableUrl';
import ErpPackageTableEdit from '../erpPackageTableEdit';
import * as SysField from '../erpPackageTableField';

const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageTableList = () => {
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
       <FormItem label="套餐id" name="packageId" component={SysField.PackageId}/>
       <FormItem label="套餐" name="package" component={SysField.Package}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={erpPackageTableList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="套餐id" dataIndex="packageId"/>
        <Column title="套餐" dataIndex="package"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={erpPackageTableDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ErpPackageTableEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ErpPackageTableList;
