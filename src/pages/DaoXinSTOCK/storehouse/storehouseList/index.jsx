/**
 * 地点表列表页
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
import {placeDelete, placeList} from '../storehouseUrl';
import PlaceEdit from '../storehouseEdit';
import * as SysField from '../storehouseField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const PlaceList = () => {
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
       <FormItem label="仓库名称" name="name" component={SysField.Name}/>
       <FormItem label="仓库地点" name="position" component={SysField.Position}/>
       <FormItem label="经度" name="longitude" component={SysField.Longitude}/>
       <FormItem label="纬度" name="latitude" component={SysField.Latitude}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={placeList}
        rowKey="storehouseid"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="仓库名称" dataIndex="name"/>
        <Column title="仓库地点" dataIndex="palce"/>
        <Column title="经度" dataIndex="longitude"/>
        <Column title="纬度" dataIndex="latitude"/>
        <Column title="仓库面积" dataIndex="measure"/>
        <Column title="仓库容量" dataIndex="capacity"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.storehouseId);
              }}/>
              <DelButton api={placeDelete} value={record.storehouseId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={800} title="编辑" component={PlaceEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default PlaceList;
