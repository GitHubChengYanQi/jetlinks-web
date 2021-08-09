/**
 * 合同表列表页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractBatchDelete, contractDelete, contractList} from '../ContractUrl';
import * as SysField from '../ContractField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';
import Contract from '@/pages/Crm/contract/ContractList/components/Contract';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractList = () => {


  const ref = useRef(null);
  const content = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="合同名称" name="name" component={SysField.Name} />
      </>
    );
  };

  const [ids, setIds] = useState([]);


  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...contractBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
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
        footer={footer}
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="合同名称" dataIndex="name" render={(text, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
                content.current.open(record.contractId);
            }}>{text}</Button>
          );
        }} />
        <Column title="甲方" dataIndex="partAName" />
        <Column title="乙方" dataIndex="partBName" />
        <Column title="创建时间" dataIndex="time" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={contractDelete} value={record.contractId} onSuccess={() => {
                tableRef.current.submit();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={1500} title="合同" component={AddContractEdit} onSuccess={() => {
        tableRef.current.submit();
        ref.current.close();
      }} ref={ref} />
      <Modal2 width={1500} title="合同" component={Contract} onSuccess={() => {
        tableRef.current.submit();
        content.current.close();
      }} ref={content} />
    </>
  );
};

export default ContractList;
