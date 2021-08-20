/**
 * 商品轮播图列表页
 *
 * @author siqiang
 * @Date 2021-08-19 16:34:29
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {goodsDetailsBannerDelete, goodsDetailsBannerList} from '../goodsDetailsBannerUrl';
import GoodsDetailsBannerEdit from '../goodsDetailsBannerEdit';
import * as SysField from '../goodsDetailsBannerField';

const {Column} = AntTable;
const {FormItem} = Form;

const GoodsDetailsBannerList = () => {
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
        api={goodsDetailsBannerList}
        rowKey="detailBannerId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="排序" dataIndex="sort"/>
        <Column title="图片路径" dataIndex="imgUrl"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.detailBannerId);
              }}/>
              <DelButton api={goodsDetailsBannerDelete} value={record.detailBannerId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={GoodsDetailsBannerEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default GoodsDetailsBannerList;
