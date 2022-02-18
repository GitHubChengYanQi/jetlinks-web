/**
 * 采购报价表单列表页
 *
 * @author Captain_Jazz
 * @Date 2021-12-22 11:17:27
 */

import React, {useRef} from 'react';
import {Card, Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import Drawer from '@/components/Drawer';
import Form from '@/components/Form';
import {purchaseQuotationList} from '../purchaseQuotationUrl';
import PurchaseQuotationEdit from '../purchaseQuotationEdit';
import * as SysField from '../purchaseQuotationField';
import {IsFreight} from '../purchaseQuotationField';
import Breadcrumb from '@/components/Breadcrumb';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const PurchaseQuotationList = ({
  value = {},
}) => {

  const {skuId, name, customerId,brandId, check, source, sourceId} = value;

  const ref = useRef(null);
  const tableRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem label="物料" name="skuId" value={skuId} component={SysField.SkuListSelect} />
        <FormItem label="供应商" name="customerId" value={customerId} component={SysField.CustomerId} />
        <FormItem label="品牌" name="brandId" value={brandId} component={SysField.BrandId} />
        <FormItem label="是否含税" name="isTax" component={IsFreight} />
        <FormItem label="来源" name="source" value={source} component={SysField.Source} />
        <FormItem hidden name="sourceId" value={sourceId} component={SysField.SourceId} />
      </>
    );
  };

  return (
    <>
      {name && <Card title={name} bordered={false} bodyStyle={{padding: 0}} />}
      <Table
        noRowSelection
        formActions={formActionsPublic}
        contentHeight={check}
        title={<Breadcrumb />}
        headStyle={{display: check && 'none'}}
        api={purchaseQuotationList}
        rowKey="purchaseQuotationId"
        searchForm={searchForm}
        ref={tableRef}
      >
        {!skuId && <Column title="物料" dataIndex="skuResult" render={(value) => {
          return <SkuResultSkuJsons skuResult={value} />;
        }} />}
        {!customerId && <Column title="供应商" dataIndex="customerResult" render={(value) => {
          return <>{value && value.customerName}</>;
        }} />}
        {!brandId && <Column title="品牌" dataIndex="brandResult" render={(value) => {
          return <>{value && value.brandName}</>;
        }} />}
        <Column title="价格" dataIndex="price" width={100} align="center" sorter />
        <Column title="报价有效期" dataIndex="periodOfValidity" width={180} align="center" />
        <Column title="数量" dataIndex="total" align="center" width={80} sorter />
        <Column title="税前单价" dataIndex="preTax" width={120} align="center" sorter />
        <Column title="运费价格" dataIndex="freight" width={120} align="center" sorter />
        <Column title="税后单价" dataIndex="afterTax" width={120} align="center" sorter />
        <Column title="税额" dataIndex="taxPrice" width={80} align="center" />
        <Column title="运费" dataIndex="isFreight" width={80} align="center" render={(value) => {
          return value ? '√' : '×';
        }} />
        <Column title="来源" dataIndex="source" width={100} align="center" render={(value) => {
          switch (value) {
            case 'toBuyPlan':
              return '待买计划';
            case 'purchasePlan':
              return '采购计划';
            case 'inquiryTask':
              return '询价任务';
            case 'sku':
              return '物料';
            default:
              break;
          }
        }} />
        <Column title="创建时间" dataIndex="createTime" width={200} align="center" />
        <Column title="创建人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column />
      </Table>
      <Drawer width={800} title="编辑" component={PurchaseQuotationEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default PurchaseQuotationList;
