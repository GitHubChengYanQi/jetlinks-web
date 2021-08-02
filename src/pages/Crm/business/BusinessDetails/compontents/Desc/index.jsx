import React from 'react';
import { Descriptions } from 'antd';

const Desc = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions title="基本信息">

        <Descriptions.Item label="商机名称">{data.businessName === "" ? '未填写' :  data.businessName}</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.Person === "" ? '未填写' :  data.Person}</Descriptions.Item>
        <Descriptions.Item label="客户名称">{data.customerName === "" ? '未填写' :  data.customerName}</Descriptions.Item>
        <Descriptions.Item label="机会来源">{data.orignName === "" ? '未填写' :  data.orignName}</Descriptions.Item>
        <Descriptions.Item label="立项日期">{data.time === "" ? '未填写' :  data.time}</Descriptions.Item>
        <Descriptions.Item label="结单日期">{data.statementTime === "" ? '未填写' :  data.statementTime}</Descriptions.Item>
        <Descriptions.Item label="赢率">{data.salesProcessId === "" ? '未填写' :  data.salesProcessId}</Descriptions.Item>
        <Descriptions.Item label="阶段变更时间">{data.changeTime === "" ? '未填写' :  data.changeTime}</Descriptions.Item>
        <Descriptions.Item label="商机金额">{data.opportunityAmount === "" ? '未填写' :  data.opportunityAmount}</Descriptions.Item>
        <Descriptions.Item label="商机状态">{data.state === "" ? '未填写' :  data.state}</Descriptions.Item>
        <Descriptions.Item label="销售流程">{data.salesId === "" ? '未填写' :  data.salesId}</Descriptions.Item>
        <Descriptions.Item label="产品合计">{data.totalProducts === "" ? '未填写' :  data.totalProducts}</Descriptions.Item>
        <Descriptions.Item label="整单折扣">{data.orderDiscount === "" ? '未填写' :  data.orderDiscount}</Descriptions.Item>
        <Descriptions.Item label="输单原因">{data.reason === "" ? '未填写' :  data.reason}</Descriptions.Item>
        <Descriptions.Item label="商机阶段">{data.stage === "" ? '未填写' :  data.stage}</Descriptions.Item>
        <Descriptions.Item label="主线索">{data.mainCable === "" ? '未填写' :  data.mainCable}</Descriptions.Item>

        {/*
          商机名称   businessName
          负责人       userId
          客户名称      customerName
         机会来源：   orignName
         立项日期    time
        结单日期   statementTime
        赢率        salesProcessId
        阶段变更时间   changeTime
        商机金额  opportunityAmount
        商机状态      state
        销售流程   salesName
        产品合计   totalProducts
        整单折扣    orderDiscount
        输单原因      reason
        商机阶段    stage
        主线索       mainCable

        */}


      {/*
        新增字段：
            商机名称   business_name
             机会来源：   origin_id         通过origin_id   获取   name   （来源名称）
            结单日期   statement_time
            赢率        sales_process_id
            阶段变更时间   Change_time
            商机金额  opportunity_amount
            销售流程   sales_process_id     通过sales_id 获取  销售流程
            产品合计   total_products
            整单折扣    order_discount
            输单原因      reason
            主线索       Main_cable

         所有字段：

      */}

      </Descriptions>
    </>
  );
};

export default Desc;
