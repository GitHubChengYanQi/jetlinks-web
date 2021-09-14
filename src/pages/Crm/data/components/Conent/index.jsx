import React from 'react';
import {Card} from 'antd';

const Conent = (props) => {

  const {titles,value} = props;

  return (
    <Card title={titles || null}>
      {value || null}
    </Card>
  );
};

export default Conent;
