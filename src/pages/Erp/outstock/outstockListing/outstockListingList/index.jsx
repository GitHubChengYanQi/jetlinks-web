/**
 * 出库清单列表页
 *
 * @author cheng
 * @Date 2021-09-15 11:15:44
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {outstockListingDelete, outstockListingList} from '../outstockListingUrl';
import OutstockListingEdit from '../outstockListingEdit';
import * as SysField from '../outstockListingField';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockListingList = () => {
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
       <FormItem label="出库时间" name="time" component={SysField.Time}/>
       <FormItem label="出库数量" name="number" component={SysField.Number}/>
       <FormItem label="出库价格" name="price" component={SysField.Price}/>
       <FormItem label="品牌id" name="brandId" component={SysField.BrandId}/>
       <FormItem label="部门编号" name="deptId" component={SysField.DeptId}/>
       <FormItem label="产品id" name="itemId" component={SysField.ItemId}/>
       <FormItem label="出库状态" name="state" component={SysField.State}/>
       <FormItem label="出库单号" name="outstockOrderId" component={SysField.OutstockOrderId}/>
       <FormItem label="发货申请" name="outstockApplyId" component={SysField.OutstockApplyId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={outstockListingList}
        rowKey="outstockListingId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出库时间" dataIndex="time"/>
        <Column title="出库数量" dataIndex="number"/>
        <Column title="出库价格" dataIndex="price"/>
        <Column title="品牌id" dataIndex="brandId"/>
        <Column title="部门编号" dataIndex="deptId"/>
        <Column title="产品id" dataIndex="itemId"/>
        <Column title="出库状态" dataIndex="state"/>
        <Column title="出库单号" dataIndex="outstockOrderId"/>
        <Column title="发货申请" dataIndex="outstockApplyId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outstockListingId);
              }}/>
              <DelButton api={outstockListingDelete} value={record.outstockListingId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={OutstockListingEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OutstockListingList;
