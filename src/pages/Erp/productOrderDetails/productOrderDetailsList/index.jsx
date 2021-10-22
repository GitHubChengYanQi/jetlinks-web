/**
 * 产品订单详情列表页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productOrderDetailsDelete, productOrderDetailsList} from '../productOrderDetailsUrl';
import ProductOrderDetailsEdit from '../productOrderDetailsEdit';
import * as SysField from '../productOrderDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ProductOrderDetailsList = () => {
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
       <FormItem label="产品订单id" name="productOrderId" component={SysField.ProductOrderId}/>
       <FormItem label="spuId" name="spuId" component={SysField.SpuId}/>
       <FormItem label="skuId" name="skuId" component={SysField.SkuId}/>
       <FormItem label="数量" name="number" component={SysField.Number}/>
       <FormItem label="金额" name="money" component={SysField.Money}/>
       <FormItem label="创建时间" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="创建者" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
       <FormItem label="部门编号" name="deptId" component={SysField.DeptId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={productOrderDetailsList}
        rowKey="productOrderDetailsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品订单id" dataIndex="productOrderId"/>
        <Column title="spuId" dataIndex="spuId"/>
        <Column title="skuId" dataIndex="skuId"/>
        <Column title="数量" dataIndex="number"/>
        <Column title="金额" dataIndex="money"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="创建者" dataIndex="createUser"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="修改者" dataIndex="updateUser"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="部门编号" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.productOrderDetailsId);
              }}/>
              <DelButton api={productOrderDetailsDelete} value={record.productOrderDetailsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ProductOrderDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ProductOrderDetailsList;
