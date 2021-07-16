/**
 * 经纬度表列表页
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {lalDelete, lalList} from '../lalUrl';
import LalEdit from '../lalEdit';
import * as SysField from '../lalField';

const {Column} = AntTable;
const {FormItem} = Form;

const LalList = () => {
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
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={lalList}
        rowKey="lalId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="name"/>
        <Column title="经度" dataIndex="ewItude"/>
        <Column title="纬度" dataIndex="snItude"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.lalId);
              }}/>
              <DelButton api={lalDelete} value={record.lalId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={LalEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default LalList;
