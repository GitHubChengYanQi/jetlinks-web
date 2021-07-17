/**
 * 报价表列表页
 *
 * @author ta
 * @Date 2021-07-17 15:28:13
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {quoteDelete, quoteList} from '../quoteUrl';
import QuoteEdit from '../quoteEdit';
import * as SysField from '../quoteField';

const {Column} = AntTable;
const {FormItem} = Form;

const QuoteList = () => {
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
       <FormItem label="报价单标题" name="title" component={SysField.Title}/>
       <FormItem label="报价单编号" name="quoteId" component={SysField.QuoteId}/>
       <FormItem label="客户名称" name="name" component={SysField.Name}/>
       <FormItem label="报价阶段" name="quotePhases" component={SysField.QuotePhases}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={quoteList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="报价单标题" dataIndex="title"/>
        <Column title="报价单编号" dataIndex="quoteId"/>
        <Column title="客户名称" dataIndex="name"/>
        <Column title="总金额" dataIndex="prices"/>
        <Column title="报价阶段" dataIndex="quotePhases"/>
        <Column title="报价人" dataIndex="people"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={quoteDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={QuoteEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default QuoteList;
