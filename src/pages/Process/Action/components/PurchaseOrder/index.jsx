import React from 'react';
import {Descriptions} from 'antd';
import Empty from '@/components/Empty';

const PurchaseOrder = ({data}) => {

  if (!data) {
    return <Empty />;
  }

  return <>
    <Descriptions>
      <Descriptions.Item label="采购单号">{data.procurementOrderId}</Descriptions.Item>
      <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
    </Descriptions>
  </>;
};

export default PurchaseOrder;
