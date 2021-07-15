/**
 * 品牌表列表页
 *
 * @author
 * @Date 2021-07-14 14:19:04
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {brandDelete, brandList} from '../brandUrl';
import BrandEdit from '../brandEdit';
import * as SysField from '../brandField';
import './index.scss';

const {Column} = AntTable;
const {FormItem} = Form;

const BrandList = () => {
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
       <FormItem label="品牌名称" name="brandName" component={SysField.BrandName}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={brandList}
        rowKey="brandId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="品牌名称" dataIndex="brandName"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.brandId);
              }}/>
              <DelButton api={brandDelete} value={record.brandId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={BrandEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default BrandList;
