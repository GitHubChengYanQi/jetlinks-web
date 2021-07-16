/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {stockDelete, stockList} from '../stockUrl';
import StockEdit from '../stockEdit';
import * as SysField from '../stockField';

const {Column} = AntTable;
const {FormItem} = Form;

const StockList = () => {
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
       <FormItem label="仓库地点" name="pname" component={SysField.PalceId}/>
       <FormItem label="物品名称" name="iname" component={SysField.ItemId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={stockList}
        rowKey="stockId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="仓库名称" dataIndex="pname"/>
        <Column title="物品名称" dataIndex="iname"/>
        <Column title="品牌" dataIndex="bname"/>
        <Column title="数量" dataIndex="inventory"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.stockId);
              }}/>
              <DelButton api={stockDelete} value={record.stockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={StockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>

  );
};

export default StockList;
