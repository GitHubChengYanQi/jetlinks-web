// 系统信息
import React from 'react';
import { Descriptions } from 'antd';

const Desc = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions title="系统信息">
        <Descriptions.Item label="创建人">{data.createUser === "" ? '未填写' :  data.createUser}</Descriptions.Item>
        <Descriptions.Item label="最后修改人">{data.updateUser === "" ? '未填写' :  data.updateUser}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{data.createTime === "" ? '未填写' :  data.createTime}</Descriptions.Item>
        <Descriptions.Item label="最后修改时间">{data.updateTime === "" ? '未填写' :  data.updateTime}</Descriptions.Item>
        <Descriptions.Item label="负责人主属部门">{data.deptId === "" ? '未填写' :  data.deptId}</Descriptions.Item>

        {/*
      新增字段：
        商机名称   business_name
        机会来源：   origin_id   通过origin_id   获取   name  （来源名称）
        结单日期   statement_time
        赢率        sales_process_id
         阶段变更时间   Change_time
         商机金额  opportunity_amount
         销售流程   sales_process_id     通过sales_id 获取  销售流程
         产品合计   total_products
         整单折扣    order_discount
         输单原因      reason
         主线索       Main_cable
      */}

      </Descriptions>
    </>
  );
};

export default Desc;
