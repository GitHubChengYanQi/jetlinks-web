/**
 * 列表页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React from 'react';
import {Table, Table as AntTable} from 'antd';
import {procurementOrderDetailList} from '../procurementOrderDetailUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;

const ProcurementOrderDetailList = ({value}) => {

  const {loading, data} = useRequest(procurementOrderDetailList,{defaultParams:{data:{procurementOrderId:value}}});

  return (
    <div style={{padding: 16}}>
      <Table
        pagination={false}
        loading={loading}
        rowKey="orderDetailId"
        dataSource={data}
      >
        <Column title="物料" dataIndex="skuResult" render={(value) => {
          return <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="品牌" dataIndex="brandResult" render={(value) => {
          return <>{value && value.brandName}</>;
        }} />
        <Column title="供应商" dataIndex="customerResult" render={(value) => {
          return <>{value && value.customerName}</>;
        }} />
        <Column title="数量" dataIndex="number" />
        <Column title="单价" dataIndex="money" />
      </Table>
    </div>
  );
};

export default ProcurementOrderDetailList;
