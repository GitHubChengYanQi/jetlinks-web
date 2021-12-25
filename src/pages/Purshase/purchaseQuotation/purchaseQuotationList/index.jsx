/**
 * 采购报价表单列表页
 *
 * @author Captain_Jazz
 * @Date 2021-12-22 11:17:27
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {purchaseQuotationDelete, purchaseQuotationList} from '../purchaseQuotationUrl';
import PurchaseQuotationEdit from '../purchaseQuotationEdit';
import * as SysField from '../purchaseQuotationField';
import {SkuListSelect} from '../purchaseQuotationField';
import Breadcrumb from '@/components/Breadcrumb';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;
const {FormItem} = Form;

const PurchaseQuotationList = () => {
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
        <FormItem label="物料" name="skuId" component={SysField.SkuListSelect} />
        <FormItem label="价格" name="price" component={SysField.Price} />
        <FormItem label="供应商id" name="customerId" component={SysField.CustomerId} />
        <FormItem label="报价有效期" name="periodOfValidity" component={SysField.PeriodOfValidity} />
        <FormItem label="数量" name="total" component={SysField.Total} />
        <FormItem label="是否含税" name="isTax" component={SysField.IsTax} />
        <FormItem label="税前单价" name="preTax" component={SysField.PreTax} />
        <FormItem label="运费价格" name="freight" component={SysField.Freight} />
        <FormItem label="税后单价" name="afterTax" component={SysField.AfterTax} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={purchaseQuotationList}
        rowKey="purchaseQuotationId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物料" dataIndex="skuResult" render={(value) => {
          return <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="供应商" dataIndex="customerResult" render={(value)=>{
          return <>{value && value.customerName}</>;
        }} />
        <Column title="价格" dataIndex="price" width={100} align='center' />
        <Column title="报价有效期" dataIndex="periodOfValidity" width={180} align='center' />
        <Column title="数量" dataIndex="total" align='center' width={70} />
        <Column title="税率" dataIndex="taxRateId" />
        <Column title="税前单价" dataIndex="preTax" width={100} align='center' />
        <Column title="运费价格" dataIndex="freight" width={100} align='center' />
        <Column title="税后单价" dataIndex="afterTax" width={100} align='center' />
        <Column title="税额" dataIndex="taxPrice" width={80} align='center' />
        <Column title="是否包含运费" dataIndex="isFreight" width={80} align='center' />
        <Column title="来源" dataIndex="source" width={100} align='center' render={(value)=>{
          switch (value) {
            case 'toBuyPlan':
              return '待买计划';
            default:
              break;
          }
        }} />
        <Column title="创建时间" dataIndex="createTime"  width={200} align='center' />
        <Column title="创建用户" dataIndex="user" render={(value)=>{
          return <>{value && value.name}</>;
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <DelButton api={purchaseQuotationDelete} value={record.purchaseQuotationId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Drawer width={800} title="编辑" component={PurchaseQuotationEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default PurchaseQuotationList;
