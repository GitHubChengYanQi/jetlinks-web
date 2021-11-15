import React, {useRef, useState} from 'react';
import Form from '@/components/Form';

import {
  outBound,
  outstockOrderAdd,
  outstockOrderDetail,
} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import * as SysField from '@/pages/Erp/outstock/outstockOrder/outstockOrderField';
import OutstockListingList from '@/pages/Erp/outstock/outstockListing/outstockListingList';
import {Button, Card, Col, Descriptions, Row} from 'antd';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';
import ProCard from '@ant-design/pro-card';
import InputEdit from '@/pages/Crm/customer/components/Edit/InputEdit';
import Code from '@/pages/Erp/spu/components/Code';

const OutStock = (props) => {

  const {value} = props;


  return (
    <Card title="出库设置" bordered={false}>
      <ProCard className="h2Card" title="出库信息" headerBordered>
        <Descriptions column={2} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="出库单号"> <Code source="outstock" id={value.outstockOrderId} />{value.coding}</Descriptions.Item>
          <Descriptions.Item label="仓库">{value.storehouseResult && value.storehouseResult.name}</Descriptions.Item>
          <Descriptions.Item label="负责人">{value.userResult && value.userResult.name}</Descriptions.Item>
          <Descriptions.Item label="备注">{value.note}</Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard className="h2Card" title="出库清单" headerBordered>
        <OutstockListingList value={value.outstockOrderId} />
      </ProCard>
    </Card>

  );
};
export default OutStock;
