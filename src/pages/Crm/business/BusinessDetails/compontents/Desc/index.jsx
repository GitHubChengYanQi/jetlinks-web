import React from 'react';
import {Descriptions} from 'antd';

const Desc = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions title="基础数据">
        <Descriptions.Item label="客户名称">{data.customerId === '' ? '未填写' : data.customerId}</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.person === '' ? '未填写' : data.person}</Descriptions.Item>
        <Descriptions.Item label="阶段状态">{data.state === '' ? '未填写' : data.state}</Descriptions.Item>
        <Descriptions.Item label="商机阶段">{data.stage === '' ? '未填写' : data.stage}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Desc;
