import React, {useState} from 'react';
import {Button, Modal, Result} from 'antd';
import {useHistory} from 'ice';

const BusinessComplete = (props) => {
  const {result, disabled} = props;
  const history = useHistory();

  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" style={disabled === false ? {'display' : 'none'} :  null } key="console" onClick={() => {
          props.onChange(1);
        }}>
          再加一条
        </Button>,
        <Button key="2"  type="link" onClick={() => {
          history.push(`/CRM/business/${result}/${false}`);
        }}>
          完善明细
        </Button>,
        <Button  key="1" type="link" onClick={() => {
          history.push(`/CRM/business/${result}`);
        }}>查看详情</Button>
      ]}
    />
  );
};

export default  BusinessComplete;
