/**
 * 入库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {instockDelete, instockList} from '../InstockUrl';
import InstockEdit from '../InstockEdit';
import * as SysField from '../InstockField';

const {Column} = AntTable;
const {FormItem} = Form;

const InstockList = () => {
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
        <FormItem label="产品名称" name="name" component={SysField.ItemId}/>
        <FormItem label="仓库名称" name="placeName" component={SysField.ItemId}/>
        <FormItem label="登记时间" name="registerTime" component={SysField.RegisterTime}/>
        <FormItem label="品牌" name="brandName" component={SysField.ItemId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={instockList}
        rowKey="instockId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="name" sorter/>
        <Column title="仓库名称" dataIndex="placeName" sorter/>
        <Column title="登记时间" dataIndex="registerTime" sorter/>
        <Column title="入库数量" dataIndex="number" sorter/>
        <Column title="价格" dataIndex="price" sorter/>
        <Column title="品牌" dataIndex="brandName" sorter/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.instockId);
              }}/>
              <DelButton api={instockDelete} value={record.instockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={800} title="编辑" component={InstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default InstockList;
