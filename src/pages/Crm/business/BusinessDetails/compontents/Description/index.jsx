import React from 'react';
import {Descriptions} from 'antd';

const Description = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions column={2} bordered labelStyle={{width: 120}}>
        <Descriptions.Item label="商机编号">{data.businessId ?  data.businessId : '未填写'}</Descriptions.Item>
        <Descriptions.Item label="销售流程">{data.getsales[0] ? data.getsales[0].name: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="客户">{data.getcustomer[0] ? data.getcustomer[0].customerName: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="机会来源">{data.getorigin[0] ? data.getorigin[0].originName: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="商机跟踪">{data.trackId ? data.trackId: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="商机名称">{data.businessName ?  data.businessName: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.getuser[0] ?  data.getuser[0].account: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="结单日期">{data.statementTime ?   data.statementTime: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="阶段变更时间">{data.changeTime  ?  data.setup: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="商机金额">{data.opportunityAmount ?  data.opportunityAmount: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="赢率">{data.process[0] ? `${data.process[0].percentage}%` : '未填写'}</Descriptions.Item>
        <Descriptions.Item label="产品合计">{data.totalProducts  ?  data.totalProducts: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="立项日期">{data.note  ? data.note: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="商机阶段">{data.stage  ?  data.stage: '未填写'}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default Description;
