import React from 'react';
import {useParams} from 'ice';
import {Button, Card} from 'antd';
import WorkFlow from '@/pages/ReSearch/BOM/WorkFlow';

const Detail = (props) => {

  const params = useParams();

  return <>
    <Card
      bodyStyle={{padding:0}}
      extra={<Button type="primary">保存</Button>}
    />
    <Card
      style={{height: '90vh', overflowY: 'auto'}}
    >
      <WorkFlow />
    </Card>
  </>;
};

export default Detail;
