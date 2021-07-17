/**
 * 商机表列表页
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
import { commercialDelete,  commercialList} from '../ commercialUrl';
import  commercialEdit from '../ commercialEdit';
import * as SysField from '../ commercialField';

const {Column} = AntTable;
const {FormItem} = Form;

const  CommercialList = () => {
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
       <FormItem label="报价编号" name="quoteId" component={SysField.QuoteId}/>
       <FormItem label="机会阶段" name="phases" component={SysField.Phases}/>
       <FormItem label="机会来源" name="source" component={SysField.Source}/>
       <FormItem label="机会状态" name="state" component={SysField.State}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={ commercialList}
        rowKey="commercialId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="name"/>
        <Column title="报价编号" dataIndex="quoteId"/>
        <Column title="机会阶段" dataIndex="phases"/>
        <Column title="机会来源" dataIndex="source"/>
        <Column title="机会状态" dataIndex="state"/>
        <Column title="负责人" dataIndex="main"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.commercialId);
              }}/>
              <DelButton api={ commercialDelete} value={record.commercialId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ commercialEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default  CommercialList;
