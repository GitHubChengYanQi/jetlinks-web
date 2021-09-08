/**
 * 商品轮播图列表页
 *
 * @author siqiang
 * @Date 2021-08-19 16:34:29
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Image, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {goodsDetailsBannerDelete, goodsDetailsBannerList} from '../goodsDetailsBannerUrl';
import GoodsDetailsBannerEdit from '../goodsDetailsBannerEdit';
import * as SysField from '../goodsDetailsBannerField';
import {Breadcrumb} from "@alifd/next";

const {Column} = AntTable;
const {FormItem} = Form;

const GoodsDetailsBannerList = (props) => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const [goodDetailId, setGoodDetailId] = useState(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          setGoodDetailId(props.value);
          ref.current.open(false);
        }}/>
      </>
    );
  };

  useEffect(()=>{
    tableRef.current.formActions.setFieldValue('good_details_id', props.value);
    tableRef.current.submit();
  }, [props.value]);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display':'none'}}  name="goodDetailsId" component={SysField.goodDetailsId} value={props.value}  />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={goodsDetailsBannerList}
        rowKey="detailBannerId"
        searchForm={searchForm}
        isModal={false}
        SearchButton
        actions={actions()}
        ref={tableRef}
      >
        <Column title="排序" dataIndex="sort"/>
        <Column title="商品图片" dataIndex="imgUrl" render={(value, record) => {
          return (
            <>
              <Image width={100} height={80} src={value} />
            </>
          );
        }} />
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
      <Drawer width={800} title="商品图片" component={GoodsDetailsBannerEdit} goodDetailId={goodDetailId} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default GoodsDetailsBannerList;
