/**
 * 话术基础资料列表页
 *
 * @author
 * @Date 2021-09-11 13:27:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {speechcraftDelete, speechcraftList} from '../../speechcraftUrl';
import SpeechcraftEdit from '../../speechcraftEdit';
import * as SysField from '../../speechcraftField';

const {Column} = AntTable;
const {FormItem} = Form;

const SpeechcraftTable = () => {
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
       <FormItem label="标题" name="speechcraftTitle" component={SysField.SpeechcraftTitle}/>
       <FormItem label="关键词" name="speechcraftKey" component={SysField.SpeechcraftKey}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={speechcraftList}
        rowKey="speechcraftId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="标题" dataIndex="speechcraftTitle"/>
        <Column title="详情" dataIndex="speechcraftDetails"/>
        <Column title="关键词" dataIndex="speechcraftKey"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.speechcraftId);
              }}/>
              <DelButton api={speechcraftDelete} value={record.speechcraftId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={SpeechcraftEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default SpeechcraftTable;
