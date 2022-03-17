import React from 'react';
import {Card, Progress, Space, Statistic, Table} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Empty from '@/components/Empty';


const DataList = ({
  data,
  type,
  loading,
}) => {

  const count = (array) => {
    let number = 0;
    array.map((item) => {
      return number += item.number;
    });
    return number;
  };

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  if (!data) {
    return <Empty />;
  }

  const titleType = () => {
    switch (type) {
      case 'spu':
        return {
          key: 'spuId',
          countTitle: '产品种类',
          cardTitle: '产品列表',
          table: <Table
            tableKey="stockSpu"
            rowKey="spuId"
            dataSource={data || []}
          >
            <Table.Column key={1} title="产品名称" dataIndex="skuResult" render={(value) => {
              return value && value.spuResult && value.spuResult.name;
            }} />
            <Table.Column key={2} title="库存数量" dataIndex="number" />
            <Table.Column />
          </Table>
        };
      case 'sku':
        return {
          key: 'skuId',
          countTitle: '型号种类',
          cardTitle: '型号列表',
          table: <Table
            tableKey="stockSku"
            rowKey="skuId"
            dataSource={data || []}
          >
            <Table.Column key={1} title="物料编码" dataIndex="skuResult" render={(value) => {
              return value && value.standard;
            }} />
            <Table.Column key={21} title="物料分类" dataIndex="skuResult" render={(value) => {
              return value && value.spuResult && value.spuResult.spuClassificationResult && value.spuResult.spuClassificationResult.name;
            }} />
            <Table.Column key={3} title="物料名称" dataIndex="skuResult" render={(value) => {
              return value && value.spuResult && value.spuResult.name;
            }} />
            <Table.Column key={4} title="物料型号" dataIndex="skuResult" render={(value) => {
              return value && value.skuName;
            }} />
            <Table.Column key={5} title="物料规格" dataIndex="skuResult" render={(value) => {
              return <div style={{minWidth:50}}>{value && value.specifications}</div>;
            }} />
            <Table.Column key={6} title="物料描述" dataIndex="skuResult" render={(value) => {
              return <SkuResultSkuJsons skuResult={value} describe />;
            }} />
            <Table.Column key={7} title="库存数量" dataIndex="number" />
            <Table.Column />
          </Table>
        };
      default:
        return {};
    }
  };

  return <>
    <Card title="统计数值" bordered={false}>
      <Space style={{padding: 16}}>
        <Progress
          type="circle"
          percent={100}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          format={() =>
            <Statistic title={titleType().countTitle} value={data.length} />
          } />
        <Progress
          type="circle"
          percent={100}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          format={() =>
            <Statistic title="总数量" value={count(data)} />
          } />
      </Space>
    </Card>
    <Card title={titleType().cardTitle} bordered={false}>
      {titleType().table}
    </Card>
  </>;
};

export default DataList;
