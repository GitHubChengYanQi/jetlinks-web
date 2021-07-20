/**
 * 机床合同表列表页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractMachineDelete, contractMachineList} from '../contractMachineUrl';
import ContractMachineEdit from '../contractMachineEdit';
import '../contractMachineEdit/index.scss';
import * as SysField from '@/pages/DaoxinContrac/contractMachine/contractMachineField';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractMachineList1 = () => {
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
       <FormItem label="合同名称" name="contractName" component={SysField.name}/>
       <FormItem label="创建时间" name="creationTime" component={SysField.time}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={contractMachineList}
        rowKey="contractId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="合同名称" dataIndex="contractName"/>
        <Column title="创建时间" dataIndex="creationTime"/>
        <Column title="备注" dataIndex="note"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.contractId);
              }}/>
              <DelButton api={contractMachineDelete} value={record.contractId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={1500} title="编辑" component={ContractMachineEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContractMachineList1;
