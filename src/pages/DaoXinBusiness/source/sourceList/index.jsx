/**
 * 来源表列表页
 *
 * @author 
 * @Date 2021-07-19 17:59:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {sourceDelete, sourceList} from '../sourceUrl';
import SourceEdit from '../sourceEdit';
import * as SysField from '../sourceField';

const {Column} = AntTable;
const {FormItem} = Form;

const SourceList = () => {
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
       <FormItem label="来源名称" name="name" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={sourceList}
        rowKey="sourceId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="来源名称" dataIndex="name"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.sourceId);
              }}/>
              <DelButton api={sourceDelete} value={record.sourceId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={SourceEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default SourceList;
