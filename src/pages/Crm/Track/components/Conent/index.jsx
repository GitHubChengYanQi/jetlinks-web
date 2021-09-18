import React from 'react';
import {Card} from 'antd';

const Conent = (props) => {

  return (
    <>
      <Card title="跟踪内容">
        {props.value.message || null}
      </Card>
      <Card title="提醒内容">
        {props.value.note || null}
      </Card>
    </>);
};
export default Conent;
