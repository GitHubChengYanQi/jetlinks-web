/**
 * 出库表列表页
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {outboundDelete, outboundList} from '../outboundUrl';
import OutboundEdit from '../outboundEdit';
import * as SysField from '../outboundField';

const {Column} = AntTable;
const {FormItem} = Form;

const OutboundList = () => {
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
       <FormItem label="出库物品" name="itemId" component={SysField.ItemId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={outboundList}
        rowKey="outboundId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="仓库id" dataIndex="stockId"/>
        <Column title="出库物品" dataIndex="itemId"/>
        <Column title="出库数量" dataIndex="number"/>
        <Column title="出库时间" dataIndex="outtime"/>
        <Column title="出库地点" dataIndex="placeId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outboundId);
              }}/>
              <DelButton api={outboundDelete} value={record.outboundId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={OutboundEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OutboundList;
