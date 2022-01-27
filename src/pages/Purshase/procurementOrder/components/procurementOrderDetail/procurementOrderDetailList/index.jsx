/**
 * 列表页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import Table from '@/components/Table';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import {procurementOrderDetailList} from '../procurementOrderDetailUrl';
import * as SysField from '../procurementOrderDetailField';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementOrderDetailList = ({value}) => {
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
        <FormItem label="物料" name="skuId" component={SysField.SkuId} />
        <FormItem label="品牌id" name="brandId" component={SysField.BrandId} />
        <FormItem label="供应商id" name="customerId" component={SysField.CustomerId} />
        <FormItem hidden name="procurementOrderId" value={value} component={SysField.ProcurementOrderId} />
      </>
    );
  };

  return (
    <div style={{padding:16}}>
      <Table
        headStyle={{display:'none'}}
        isModal
        api={procurementOrderDetailList}
        rowKey="orderDetailId"
        searchForm={searchForm}
        contentHeight
        rowSelection
        bordered={false}
        bodyStyle={{padding:0}}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物料" dataIndex="skuResult" render={(value)=>{
          return <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="品牌" dataIndex="brandResult" render={(value)=>{
          return <>{value && value.brandName}</>;
        }} />
        <Column title="供应商" dataIndex="customerResult" render={(value)=>{
          return <>{value && value.customerName}</>;
        }}  />
        <Column title="数量" dataIndex="number" />
        <Column title="单价" dataIndex="money" />
      </Table>
    </div>
  );
};

export default ProcurementOrderDetailList;
