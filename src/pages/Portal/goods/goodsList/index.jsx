/**
 * 首页商品列表页
 *
 * @author siqiang
 * @Date 2021-08-19 08:53:11
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {goodsDelete, goodsList} from '../goodsUrl';
import GoodsEdit from '../goodsEdit';
import * as SysField from '../goodsField';

const {Column} = AntTable;
const {FormItem} = Form;

const GoodsList = () => {
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
       <FormItem label="商品名称" name="goodName" component={SysField.GoodName}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={goodsList}
        rowKey="goodId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="商品名称" fixed width={100} dataIndex="goodName"/>
        <Column title="商品标题" width={1000} dataIndex="title"/>
        <Column title="商品售价" width={100} dataIndex="price"/>
        <Column title="商品原价" width={100} dataIndex="lastPrice"/>
        <Column title="商品图片" width={100} dataIndex="imgUrl"/>
        {/*<Column title="评论" dataIndex="comment"/>*/}
        {/*<Column title="排序" dataIndex="sort"/>*/}
        <Column title="操作" fixed align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.goodId);
              }}/>
              <DelButton api={goodsDelete} value={record.goodId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="商品" component={GoodsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default GoodsList;
