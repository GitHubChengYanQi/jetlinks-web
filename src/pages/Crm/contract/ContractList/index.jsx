/**
 * 合同表列表页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractDelete, contractList} from '../ContractUrl';
import ContractEdit from '../ContractEdit';
import * as SysField from '../ContractField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {useHistory} from 'ice';
import AddContractEdit from '@/pages/Crm/addContract/AddContractEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractList = () => {

  const history = useHistory();

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
       <FormItem label="负责人" name="userId" component={SysField.UserId}/>
     </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={contractList}
        actions={actions()}
        rowKey="contractId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="合同名称" dataIndex="name"/>
        <Column title="负责人" dataIndex="userId"/>
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
      <Modal2 width={1500} title="编辑" component={AddContractEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContractList;
