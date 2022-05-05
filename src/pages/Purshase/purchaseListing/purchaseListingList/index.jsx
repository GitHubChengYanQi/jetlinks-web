/**
 * 采购清单列表页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React from 'react';
import {Badge, Descriptions, Table as AntTable} from 'antd';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useRequest} from '@/util/Request';
import {purchaseAskDetail} from '@/pages/Purshase/purchaseAsk/purchaseAskUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Note from '@/components/Note';

const {Column} = AntTable;

const PurchaseListingList = ({value}) => {

  const {loading, data} = useRequest(purchaseAskDetail, {
    defaultParams: {
      data: {
        purchaseAskId: value,
      }
    }
  });

  if (loading)
    return <ProSkeleton type="descriptions" />;

  if (!data)
    return null;

  return (
    <div>
      <ProCard headerBordered className="h2Card" title="基础信息">
        <Descriptions column={2} bordered>
          <Descriptions.Item label="采购申请编号"> {data.coding}</Descriptions.Item>
          <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          <Descriptions.Item label="备注"> <Note width="100%" value={data.note || '无'} /></Descriptions.Item>
          <Descriptions.Item label="状态">{data.statusResult && data.statusResult.name}</Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard headerBordered className="h2Card" title="采购申请详情">
        <AntTable
          pagination={false}
          dataSource={data.purchaseListings}
          rowKey="purchaseListingId"
        >
          <Column title="物料" dataIndex="skuId" render={(value, record) => {
            return <Note><SkuResultSkuJsons skuResult={record.skuResult} /></Note>;
          }}
          />
          <Column title="品牌" dataIndex="brandResult" render={(value) => {
            return <>{value ? value.brandName : '无指定品牌'}</>;
          }}
          />
          <Column title="申请数量" dataIndex="applyNumber" />
          <Column title="交付日期" dataIndex="deliveryDate" render={(value) => {
            return <>{value && value.split(' ')[0]}</>;
          }} />
          <Column title="备注" dataIndex="note" render={(value) => {
            return <Note value={value || '无'} />;
          }} />
        </AntTable>
      </ProCard>
    </div>
  );
};

export default PurchaseListingList;
