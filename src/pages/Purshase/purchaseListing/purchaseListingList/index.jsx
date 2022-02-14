/**
 * 采购清单列表页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Badge, Descriptions, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {purchaseListingDelete, purchaseListingList} from '../purchaseListingUrl';
import PurchaseListingEdit from '../purchaseListingEdit';
import * as SysField from '../purchaseListingField';
import ProCard from '@ant-design/pro-card';
import {useRequest} from '@/util/Request';
import {purchaseAskDetail} from '@/pages/Purshase/purchaseAsk/purchaseAskUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
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

  const status = (value) => {
    switch (value) {
      case 0:
        return <Badge text="待审核" color="yellow" />;
      case 2:
        return <Badge text="已通过" color="green" />;
      case 1:
        return <Badge text="已拒绝" color="red" />;
      default:
        break;
    }
  };

  return (
    <div style={{padding: 16}}>
      <ProCard headerBordered className="h2Card" title="基础信息">
        <Descriptions column={2} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="采购申请编号"> {data.coding}</Descriptions.Item>
          <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          <Descriptions.Item label="备注"> <Note width='100%' value={data.note || '无'} /></Descriptions.Item>
          <Descriptions.Item label="状态">{status(data.status)}</Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard headerBordered className="h2Card" title="采购申请详情">
        <AntTable
          pagination={false}
          dataSource={data.purchaseListingResults}
          rowKey="purchaseListingId"
        >
          <Column title="物料" dataIndex="skuId" render={(value, record) => {
            return <SkuResultSkuJsons skuResult={record.skuResult} />;
          }}
          />
          <Column title="品牌" dataIndex="brandResult" render={(value) => {
            return <>{value ? value.brandName : '任意品牌'}</>;
          }}
          />
          <Column title="申请数量" dataIndex="applyNumber" />
          {/* <Column title="可用数量" dataIndex="availableNumber" /> */}
          <Column title="交付日期" dataIndex="deliveryDate" />
          <Column title="备注" dataIndex="note" render={(value) => {
            return <Note value={value || '无'} />;
          }} />
        </AntTable>
      </ProCard>
    </div>
  );
};

export default PurchaseListingList;
