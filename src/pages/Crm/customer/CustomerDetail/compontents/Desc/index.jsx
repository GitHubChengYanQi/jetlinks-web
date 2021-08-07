import React from 'react';
import {Descriptions} from 'antd';

const Desc = (props) => {

  const {data} = props;

  if (data){

    return (
      <>
        <Descriptions title="基础数据">
          <Descriptions.Item label="法定代表人">{data.legal ?  data.legal :'未填写' }</Descriptions.Item>
          <Descriptions.Item label="客户级别">{data.crmCustomerLevelResult ?  data.crmCustomerLevelResult.level :'未填写'}</Descriptions.Item>
          <Descriptions.Item label="客户状态">{data.status  ? data.status :'未填写'}</Descriptions.Item>
          <Descriptions.Item label="负责人">{data.userResult  ? data.userResult.account :'未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};

export default Desc;
