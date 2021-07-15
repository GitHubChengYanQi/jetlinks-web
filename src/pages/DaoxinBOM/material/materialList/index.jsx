/**
 * 材质列表页
 *
 * @author cheng
 * @Date 2021-07-14 15:56:05
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {materialDelete, materialList} from '../materialUrl';
import MaterialEdit from '../materialEdit';
import * as SysField from '../materialField';

const {Column} = AntTable;
const {FormItem} = Form;

const MaterialList = () => {
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
       <FormItem label="材质名字" name="name" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={materialList}
        rowKey="materialId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="材质名字" dataIndex="name"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.materialId);
              }}/>
              <DelButton api={materialDelete} value={record.materialId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={MaterialEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default MaterialList;
