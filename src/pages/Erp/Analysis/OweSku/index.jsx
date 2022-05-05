import React from 'react';
import {Table} from 'antd';
import Empty from '@/components/Empty';

const OweSku = ({data}) => {

  if (!Array.isArray(data)) {
    return <Empty description="请选择物料进行分析" />;
  }

  return <>
    <Table
      dataSource={data.map((item, index) => {
        return {...item, key: index};
      })}
      rowKey="key"
    >
      <Table.Column title="物料编码" dataIndex="strand" render={(value) => {
        return <div style={{minWidth: 100}}>{value}</div>;
      }} />
      <Table.Column title="物料名称" dataIndex="spuName" render={(value) => {
        return <div style={{minWidth: 100}}>{value}</div>;
      }} />
      <Table.Column title="物料型号" dataIndex="skuName" render={(value) => {
        return <div style={{minWidth: 100}}>{value}</div>;
      }} />
      <Table.Column title="物料规格" dataIndex="specifications" render={(value) => {
        return <div style={{minWidth: 100}}>{value}</div>;
      }} />
      <Table.Column title="需求数量" dataIndex="demandNumber" render={(value) => {
        return <div style={{minWidth: 100}}>{value || 0}</div>;
      }} />
      <Table.Column title="库存数量" dataIndex="stockNumber" render={(value) => {
        return <div style={{minWidth: 100}}>{value || 0}</div>;
      }} />
      <Table.Column title="缺料数量" dataIndex="lackNumber" render={(value) => {
        return <div style={{minWidth: 100}}>{value || 0}</div>;
      }} />
    </Table>
  </>;
};

export default OweSku;
