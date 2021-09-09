import React from 'react';
import {Button, Result} from 'antd';

const BusinessComplete = ({add, detail=()=>{}}) => {

  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console" onClick={() => {
          add && typeof add === 'function' && add();
        }}>
          再加一条
        </Button>,
        <Button key="buy" onClick={() => {
          detail && typeof detail === 'function' &&  detail();
        }}>
          查看详情
        </Button>,
      ]}
    />
  );
};
export default BusinessComplete;
