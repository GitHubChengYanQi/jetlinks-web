/**
 * 合同模板列表页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Input, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {templateDelete, templateList} from '../templateUrl';
import TemplateEdit from '../templateEdit';
import * as SysField from '../templateField';
import {logger} from 'ice';
import {InputNumber} from 'antd/es';

const {Column} = AntTable;
const {FormItem} = Form;

const TemplateList = () => {
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
       <FormItem label="合同模板" name="name" component={SysField.Name}/>
     </>
    );
  };











  return (
    <>

      <Table
        title={<h2>列表</h2>}
        api={templateList}
        rowKey="templateId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="合同模板" dataIndex="name"/>
        {/*<Column title="合同内容" render={(value,record)=>{*/}
        {/*  return (*/}
        {/*    <div  dangerouslySetInnerHTML={{__html:record.content.replaceAll('input','<Input />').replaceAll('Number','<Input />')}}></div>*/}
        {/*  );*/}
        {/*}} />*/}
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.templateId);
              }}/>
              <DelButton api={templateDelete} value={record.templateId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={1500} title="编辑" component={TemplateEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default TemplateList;
