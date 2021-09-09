/**
 * 首页商品详情列表页
 *
 * @author siqiang
 * @Date 2021-08-19 13:30:45
 */

import React, {useEffect, useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {Breadcrumb} from "@alifd/next";
import {goodsDetailsDelete, goodsDetailsList} from '../goodsDetailsUrl';
import GoodsDetailsEdit from '../goodsDetailsEdit';
import * as SysField from '../goodsDetailsField';
import Modal2 from "@/components/Modal";
import GoodsDetailsBannerList from "@/pages/Shop/goodsDetailsBanner/goodsDetailsBannerList";


const {Column} = AntTable;
const {FormItem} = Form;

const GoodsDetailsList = (props) => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const bannerRef =useRef(null);



  useEffect(()=>{
    tableRef.current.formActions.setFieldValue('good_id', props.value);
    tableRef.current.submit();
  }, [props.value]);

  const searchForm = () => {
    return (
      <>
        <FormItem disabled label="商品名称" name="goodId" component={SysField.GoodId} value={props.value}  />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb/>}
        api={goodsDetailsList}
        rowKey="goodDetailsId"
        searchForm={searchForm}
        isModal={false}
        actions={false}
        SearchButton
        ref={tableRef}
      >
        {/*<Column title="商品名称" fixed dataIndex="goodId"/>*/}
        <Column title="商品图片" fixed width={200} dataIndex="detailBannerId"render={(text, record) => {
          return (
            <Button type="link" onClick={() => {
              bannerRef.current.open(record.goodDetailsId);
            }}>商品图片</Button>
          );
        }} />
        <Column title="商品标题" width={400} dataIndex="title"/>
        <Column title="商品售价" width={90} dataIndex="price"/>
        <Column title="商品原价" width={90} dataIndex="lastPrice"/>
        <Column title="服务" width={200}  dataIndex="server"/>
        <Column title="规格" width={100} dataIndex="specificationId"/>
        <Column title="商品详情" width={200} dataIndex="details"/>
        {/*<Column title="排序" dataIndex="sort"/>*/}
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
      <Drawer width={800} title="商品详情" component={GoodsDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
      <Modal2 width={800} title="商品图片" component={GoodsDetailsBannerList} onSuccess={() => {
        bannerRef.current.refresh();
        ref.current.close();
      }} ref={bannerRef}/>
    </>
  );
};

export default GoodsDetailsList;
