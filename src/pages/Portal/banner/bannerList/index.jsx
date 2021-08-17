/**
 * 轮播图列表页
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import {batchDelete} from '@/pages/Erp/items/ItemsUrl';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {bannerDelete, bannerList} from '../bannerUrl';
import BannerEdit from '../bannerEdit';
import * as SysField from '../bannerField';

const {Column} = AntTable;
const {FormItem} = Form;

const BannerList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="轮播图标题" name="title" component={SysField.Title} />
      </>
    );
  };

  const [ids, setIds] = useState([]);

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...batchDelete
    }} onSuccess={()=>{
      tableRef.current.refresh();
    }
    } value={ids}>批量删除</DelButton>);
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={bannerList}
        rowKey="bannerId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer}
        onChange={(value)=>{
          setIds(value);
        }}
      >
        <Column title="轮播图标题" dataIndex="title" />
        <Column title="图片路径"  dataIndex="imgUrl" render={(value,record)=>{
          return (
            <div style={{
              width:800,
              overflow: 'hidden',
              textOverflow:'ellipsis',
              whiteSpace: 'nowrap'}}>
              {
                value
              }
            </div>
          );
        }} />
        <Column title="操作" fixed='right' align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.bannerId);
              }} />
              <DelButton api={bannerDelete} value={record.bannerId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Drawer width={800} title="编辑" component={BannerEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default BannerList;
