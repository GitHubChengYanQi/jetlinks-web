import React from 'react';
import { Descriptions } from 'antd';

const Desc = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions title="基础数据">
        <Descriptions.Item label="客户级别">{data.customerLevelId === "" ? '未填写' :  data.customerLevelId}</Descriptions.Item>
        <Descriptions.Item label="法定代表人">{data.legal === "" ? '未填写' :  data.legal}</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.userId === "" ? '未填写' :  data.userId}</Descriptions.Item>
        <Descriptions.Item label="客户状态">{data.status === "" ? '未填写' :  data.status}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Desc;
