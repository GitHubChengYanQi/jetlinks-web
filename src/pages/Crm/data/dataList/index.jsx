/**
 * 资料列表页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable, Tag} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {dataDelete, dataList} from '../dataUrl';
import DataEdit from '../dataEdit';
import * as SysField from '../dataField';

const {Column} = AntTable;
const {FormItem} = Form;

const DataList = () => {
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

     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={dataList}
        rowKey="dataId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="内容" dataIndex="content"/>
        <Column title="附件" dataIndex="attachment"/>
        <Column title="产品" render={(value,record)=>{
          return (
            <>
              {
                record.itemsResults.length>0 && record.itemsResults.map((items,index)=>{
                  return (
                    <Tag key={index}>
                      {items.name}
                    </Tag>
                  );
                })
              }
            </>
          );
        }}/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.dataId);
              }}/>
              <DelButton api={dataDelete} value={record.dataId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={DataEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default DataList;
