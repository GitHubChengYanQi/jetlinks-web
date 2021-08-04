import React from 'react';
import {Descriptions} from 'antd';

const Description = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions column={2} bordered labelStyle={{width: 120}}>
        <Descriptions.Item label="商机编号">{data.businessId === '' ? '未填写' : data.businessId}</Descriptions.Item>
        <Descriptions.Item label="销售流程">{data.salesId === '' ? '未填写' : data.salesId}</Descriptions.Item>
        <Descriptions.Item label="客户">{data.customerId === '' ? '未填写' : data.customerId}</Descriptions.Item>
        <Descriptions.Item label="机会来源">{data.originId === '' ? '未填写' : data.originId}</Descriptions.Item>
        <Descriptions.Item label="商机跟踪">{data.trackId === '' ? '未填写' : data.trackId}</Descriptions.Item>
        <Descriptions.Item label="商机名称">{data.businessName === '' ? '未填写' : data.businessName}</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.person === '' ? '未填写' : data.person}</Descriptions.Item>
        <Descriptions.Item label="结单日期">{data.statementTime === '' ? '未填写' : data.statementTime}</Descriptions.Item>
        <Descriptions.Item label="阶段变更时间">{data.changeTime === '' ? '未填写' : data.setup}</Descriptions.Item>
        <Descriptions.Item label="商机金额">{data.opportunityAmount === '' ? '未填写' : data.opportunityAmount}</Descriptions.Item>
        <Descriptions.Item label="阶段状态">{data.state === '' ? '未填写' : data.state}</Descriptions.Item>
        <Descriptions.Item label="产品合计">{data.totalProducts === '' ? '未填写' : data.totalProducts}</Descriptions.Item>
        <Descriptions.Item label="立项日期">{data.note === '' ? '未填写' : data.note}</Descriptions.Item>
        <Descriptions.Item label="商机阶段">{data.stage === '' ? '未填写' : data.stage}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default Description;
