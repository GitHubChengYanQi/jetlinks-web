/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {partsDelete, partsList} from '../partsUrl';
import PartsEdit from '../partsEdit';
import * as SysField from '../partsField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const PartsList = () => {
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
       <FormItem label="物品名称" name="name" component={SysField.Name}/>
       <FormItem label="品牌名称" name="brandName" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={partsList}
        rowKey="partsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物品名称" dataIndex="name"/>
        <Column title="零件名称" render={(value,record)=>{
          return (
            <div>
              {
                record.getitem[0].name
              }
            </div>
          );
        }}/>
        <Column title="品牌名称" dataIndex="brandName"/>
        <Column title="零件数量" dataIndex="number"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.partsId);
              }}/>
              <DelButton api={partsDelete} value={record.partsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={PartsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default PartsList;
