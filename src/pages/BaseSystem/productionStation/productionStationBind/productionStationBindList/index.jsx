/**
 * 工位绑定表列表页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productionStationBindDelete, productionStationBindList} from '../productionStationBindUrl';
import ProductionStationBindEdit from '../productionStationBindEdit';
import * as SysField from '../productionStationBindField';

const {Column} = AntTable;
const {FormItem} = Form;

const ProductionStationBindList = () => {
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
       <FormItem label="工位id" name="productionStationId" component={SysField.ProductionStationId}/>
       <FormItem label="负责人" name="userId" component={SysField.UserId}/>
       <FormItem label="创建者" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="创建时间" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
       <FormItem label="部门id" name="deptId" component={SysField.DeptId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={productionStationBindList}
        rowKey="productionStationBindId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="工位id" dataIndex="productionStationId"/>
        <Column title="负责人" dataIndex="userId"/>
        <Column title="创建者" dataIndex="createUser"/>
        <Column title="修改者" dataIndex="updateUser"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="部门id" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.productionStationBindId);
              }}/>
              <DelButton api={productionStationBindDelete} value={record.productionStationBindId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ProductionStationBindEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ProductionStationBindList;
