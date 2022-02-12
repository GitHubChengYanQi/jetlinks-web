import React from 'react';
import {Descriptions} from 'antd';
import Empty from '@/components/Empty';

const PurchaseAsk = ({data}) => {


  if (!data) {
    return <Empty />;
  }

  return <>
    <Descriptions>
      <Descriptions.Item label="采购申请编码">{data.coding}</Descriptions.Item>
      <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
      <Descriptions.Item label="备注">{data.remark || '无'}</Descriptions.Item>
    </Descriptions>
  </>;
};

export default PurchaseAsk;
