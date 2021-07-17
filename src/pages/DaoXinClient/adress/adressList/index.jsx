/**
 * 客户地址表列表页
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {adressDelete, adressList} from '../adressUrl';
import AdressEdit from '../adressEdit';
import * as SysField from '../adressField';

const {Column} = AntTable;
const {FormItem} = Form;

const AdressList = () => {
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
       <FormItem label="客户名称" name="name" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={adressList}
        rowKey="adressId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="name"/>
        <Column title="地址1id" dataIndex="adress1Id"/>
        <Column title="地址1" dataIndex="adress1"/>
        <Column title="地址2id" dataIndex="adress2Id"/>
        <Column title="地址2" dataIndex="adress2"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.adressId);
              }}/>
              <DelButton api={adressDelete} value={record.adressId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={AdressEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default AdressList;
