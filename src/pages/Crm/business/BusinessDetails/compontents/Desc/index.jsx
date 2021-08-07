import React from 'react';
import {Descriptions} from 'antd';

const Desc = (props) => {

  const {data} = props;
  if (data) {
    return (
      <>
        <Descriptions title="基础数据">
          <Descriptions.Item label="客户名称">{data.customer ? data.customer.customerName : '未填写'  }</Descriptions.Item>
          <Descriptions.Item label="负责人">{data.user ?  data.user.account: '未填写'}</Descriptions.Item>
          <Descriptions.Item label="商机阶段">{data.stage ? data.stage : '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};

export default Desc;
