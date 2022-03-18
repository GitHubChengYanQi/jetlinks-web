import React from 'react';
import {Button, Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import {pendingProductionByOrder} from '@/pages/Production/Url';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;

const OrderList = ({searchForm}) => {

  const formActionsPublic = createFormActions();

  const actions = () => {
    return <>
      <Button type="primary">创建生产计划</Button>
    </>;
  };

  return <>
    <Table
      tableKey="orderList"
      formActions={formActionsPublic}
      searchForm={searchForm}
      noSort
      actions={actions()}
      noPagination={{
        defaultPageSize: 20,
        showTotal: (total) => {
          return `共${total}条`;
        },
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: [5, 10, 20, 50, 100],
        position: ['bottomRight']
      }}
      api={pendingProductionByOrder}
      rowKey="orderId"
      expandable={{
        expandedRowRender: record => {
          return <div style={{border:'1px solid rgb(233 227 227)'}}>
            <AntTable
              style={{margin: 16}}
              pagination={false}
              dataSource={record.detailResults}
              rowKey="detailId"
            >
              <Column title="物料编码" dataIndex="skuResult" render={(value) => {
                return value && value.standard;
              }} />
              <Column title="物料名称" dataIndex="skuResult" render={(value) => {
                return value && value.spuResult && value.spuResult.name;
              }} />
              <Column title="规格 / 型号" dataIndex="skuResult" render={(value) => {
                return `${value.skuName} / ${value.specifications}`;
              }} />
              <Column title="物料描述" dataIndex="skuResult" render={(value) => {
                return <SkuResultSkuJsons describe skuResult={value} />;
              }} />
              <Column title="数量" dataIndex="purchaseNumber" />
            </AntTable>
          </div>;
        },
      }}
    >
      <Column title="订单编号" key={1} dataIndex="coding" />
      <Column title="客户" key={2} dataIndex="acustomer" render={(value) => {
        return value && value.customerName;
      }} />
      <Column title="交货日期" key={3} dataIndex="deliveryDate" />
    </Table>
  </>;
};

export default OrderList;
