/**
 * 物品表列表页
 *
 * @author 
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {itemsDelete, itemsList} from '../itemsUrl';
import ItemsEdit from '../itemsEdit';
import * as SysField from '../itemsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ItemsList = () => {
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
       <FormItem label="物品名字" name="name" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={itemsList}
        rowKey="itemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物品名字" dataIndex="name"/>
        <Column title="质保期" dataIndex="shelfLife"/>
        <Column title="物品库存" dataIndex="inventory"/>
        <Column title="生产日期" dataIndex="productionTime"/>
        <Column title="重要程度" dataIndex="important"/>
        <Column title="物品重量" dataIndex="weight"/>
        <Column title="材质id" dataIndex="materialId"/>
        <Column title="成本" dataIndex="cost"/>
        <Column title="易损" dataIndex="vulnerability"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.itemId);
              }}/>
              <DelButton api={itemsDelete} value={record.itemId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ItemsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ItemsList;
