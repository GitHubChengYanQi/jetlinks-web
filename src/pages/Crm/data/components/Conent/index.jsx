import React from 'react';
import {Card} from 'antd';
import parse from 'html-react-parser';

const Conent = (props) => {

  const {titles,value} = props;

  return (
    <Card title={titles || null}>
      {parse(value)}
    </Card>
  );
};

export default Conent;
