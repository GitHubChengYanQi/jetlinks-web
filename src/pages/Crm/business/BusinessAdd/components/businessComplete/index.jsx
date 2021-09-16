import React, {useState} from 'react';
import {Button, Modal, Result} from 'antd';
import {useHistory} from 'ice';

const BusinessComplete = (props) => {
  const {result, disabled} = props;
  const history = useHistory();

  return (
    <Result
      status="success"
      title="已成功创建项目!"
      subTitle="如需完善明细请点击左侧完善明细按钮，也可通过查看详情按钮查看详情。"
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
