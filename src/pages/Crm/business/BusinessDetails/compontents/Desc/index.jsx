import React from 'react';
import {Descriptions} from 'antd';

const Desc = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions title="基础数据">
        <Descriptions.Item label="客户名称">{data.getcustomer[0] ? data.getcustomer[0].customerName : '未填写'  }</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.getuser[0] ? data.getuser[0].account: '未填写'}</Descriptions.Item>
        <Descriptions.Item label="阶段状态">{data.state ? data.state : '未填写'  }</Descriptions.Item>
        <Descriptions.Item label="商机阶段">{data.stage ? data.stage : '未填写'}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Desc;
