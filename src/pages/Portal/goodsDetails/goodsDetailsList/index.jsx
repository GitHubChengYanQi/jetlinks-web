/**
 * 首页商品详情列表页
 *
 * @author siqiang
 * @Date 2021-08-19 13:30:45
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {goodsDetailsDelete, goodsDetailsList} from '../goodsDetailsUrl';
import GoodsDetailsEdit from '../goodsDetailsEdit';
import * as SysField from '../goodsDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const GoodsDetailsList = () => {
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
        api={goodsDetailsList}
        rowKey="goodDetailsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="商品id" dataIndex="goodId"/>
        <Column title="商品轮播图id" dataIndex="detailBannerId"/>
        <Column title="商品标题" dataIndex="title"/>
        <Column title="商品售价" dataIndex="price"/>
        <Column title="商品原价" dataIndex="lastPrice"/>
        <Column title="服务" dataIndex="server"/>
        <Column title="规格id" dataIndex="specificationId"/>
        <Column title="商品详情" dataIndex="details"/>
        <Column title="排序" dataIndex="sort"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.goodDetailsId);
              }}/>
              <DelButton api={goodsDetailsDelete} value={record.goodDetailsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={GoodsDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default GoodsDetailsList;
