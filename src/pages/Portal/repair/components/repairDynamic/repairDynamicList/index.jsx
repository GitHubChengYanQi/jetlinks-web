/**
 * 售后动态表列表页
 *
 * @author 
 * @Date 2021-08-24 08:51:32
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {repairDynamicDelete, repairDynamicList} from '../repairDynamicUrl';
import RepairDynamicEdit from '../repairDynamicEdit';
import * as SysField from '../repairDynamicField';

const {Column} = AntTable;
const {FormItem} = Form;

const RepairDynamicList = () => {
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
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={repairDynamicList}
        rowKey="dynamicId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出厂编号id" dataIndex="stockItemId"/>
        <Column title="内容" dataIndex="content"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.dynamicId);
              }}/>
              <DelButton api={repairDynamicDelete} value={record.dynamicId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={RepairDynamicEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default RepairDynamicList;
