// 商机销售流程

import React from 'react';
import { Descriptions } from 'antd';

const Desc = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions title="商机销售流程">
        <Descriptions.Item label="客户等级">{data.customerLevelId === "" ? '未填写' :  data.customerLevelId}</Descriptions.Item>

        <Descriptions.Item label="需求确定">{data.name2 === "" ? '未填写' :  data.name2}</Descriptions.Item>
        <Descriptions.Item label="方案/报价">{data.name3 === "" ? '未填写' :  data.name3}</Descriptions.Item>
        <Descriptions.Item label="谈判审核">{data.name4 === "" ? '未填写' :  data.name4}</Descriptions.Item>
        <Descriptions.Item label="结束">{data.name5 === "" ? '未填写' :  data.name5}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Desc;
