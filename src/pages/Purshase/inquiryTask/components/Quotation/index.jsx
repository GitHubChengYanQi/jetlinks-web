import React from 'react';
import {Table} from 'antd';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = Table;


const Quotation = ({data}) => {


  return <>
    <Table
      pagination={false}
      dataSource={data || []}
      rowKey="purchaseQuotationId"
    >
      <Column
        title="物料"
        dataIndex="skuResult"
        onCell={(_, index) => {
          return {rowSpan: 2};
        }}
        render={(value) => {
          return <SkuResultSkuJsons skuResult={value} />;
        }} />
      <Column title="供应商" dataIndex="customerResult" render={(value) => {
        return <>{value && value.customerName}</>;
      }} />
      <Column title="价格" dataIndex="price" width={100} align="center" />
      <Column title="报价有效期" dataIndex="periodOfValidity" width={180} align="center" />
      <Column title="数量" dataIndex="total" align="center" width={70} />
      <Column title="税率" dataIndex="taxRateId" />
      <Column title="税前单价" dataIndex="preTax" width={100} align="center" />
      <Column title="运费价格" dataIndex="freight" width={100} align="center" />
      <Column title="税后单价" dataIndex="afterTax" width={100} align="center" />
      <Column title="税额" dataIndex="taxPrice" width={80} align="center" />
      <Column title="是否包含运费" dataIndex="isFreight" width={80} align="center" />
      <Column title="来源" dataIndex="source" width={100} align="center" render={(value) => {
        switch (value) {
          case 'toBuyPlan':
            return '待买计划';
          case 'purchasePlan':
            return '采购计划';
          default:
            break;
        }
      }} />
      <Column title="创建时间" dataIndex="createTime" width={200} align="center" />
      <Column title="创建用户" dataIndex="user" render={(value) => {
        return <>{value && value.name}</>;
      }} />
      <Column />
    </Table>
  </>;
};

export default Quotation;
