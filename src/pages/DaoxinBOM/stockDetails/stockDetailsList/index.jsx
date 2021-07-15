/**
 * 仓库物品明细表列表页
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
import {stockDetailsDelete, stockDetailsList} from '../stockDetailsUrl';
import StockDetailsEdit from '../stockDetailsEdit';
import * as SysField from '../stockDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const StockDetailsList = () => {
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
       <FormItem label="仓库id" name="stockId" component={SysField.StockId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={stockDetailsList}
        rowKey="stockItemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="仓库id" dataIndex="stockId"/>
        <Column title="价格" dataIndex="price"/>
        <Column title="入库时间" dataIndex="storageTime"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.stockItemId);
              }}/>
              <DelButton api={stockDetailsDelete} value={record.stockItemId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={StockDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default StockDetailsList;
