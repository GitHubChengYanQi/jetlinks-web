import React from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import {pendingProductionPlan} from '@/pages/Production/Url';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;


const PlanList = ({searchForm}) => {

  const formActionsPublic = createFormActions();

  return <>
    <Table
      listHeader={false}
      formActions={formActionsPublic}
      noSort
      tableKey="planList"
      searchForm={searchForm}
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
      api={pendingProductionPlan}
      rowKey="key"
      branch={(data) => {
        const array = [];
        data.map((item,index) => {
          if (item.skuResult) {
            array.push({
              ...item,
              key: index,
              children:null,
              allSkus: item.children,
            });
          }
          return null;
        });
        return array;
      }}
      expandable={{
        expandedRowRender: record => {
          console.log(record);
          return <div style={{border: '1px solid rgb(233 227 227)'}}>
            <AntTable
              style={{margin: 16}}
              pagination={false}
              dataSource={record.allSkus}
              rowKey="detailId"
            >
              <Column title="数量" dataIndex="purchaseNumber" />
              <Column title="交货日期" dataIndex="deliveryDate" />
            </AntTable>
          </div>;
        },
      }}
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
    </Table>
  </>;
};

export default PlanList;
