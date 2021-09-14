import React from 'react';
import {Card} from 'antd';

const Detail = (props) => {

  const {value} = props;

  return (
    <>
      <Card title={`${value.name}流程说明`}>
        {value.note}
      </Card>
    </>
  );
};
export default Detail;
