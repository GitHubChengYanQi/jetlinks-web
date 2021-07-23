/**
 * 合同表列表页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractDelete, contractList} from '../contractUrl';
import ContractEdit from '../contractEdit';
import * as SysField from '../contractField';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractList = () => {
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
       <FormItem label="合同名称" name="name" component={SysField.Name}/>
       <FormItem label="负责人id" name="userId" component={SysField.UserId}/>
       <FormItem label="创建时间" name="time" component={SysField.Time}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={contractList}
        rowKey="contractId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="合同名称" dataIndex="name"/>
        <Column title="负责人id" dataIndex="userId"/>
        <Column title="备注" dataIndex="note"/>
        <Column title="创建时间" dataIndex="time"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.contractId);
              }}/>
              <DelButton api={contractDelete} value={record.contractId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={1500} title="编辑" component={ContractEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContractList;
