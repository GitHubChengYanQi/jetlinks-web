import React, {useState} from 'react';
import {useHistory, useParams} from 'ice';
import {Button, Card, Space} from 'antd';
import WorkFlow from '@/pages/ReSearch/BOM/WorkFlow';

const Detail = (props) => {

  const params = useParams();

  const history = useHistory();

  const [value, onChange] = useState();

  return <>
    <Card
      bodyStyle={{padding: 0}}
      extra={<Space>
        <Button type="primary" onClick={() => {
          console.log(value);
        }}>保存</Button>
        <Button onClick={() => {
          history.push('SPU/processRoute');
        }}>返回</Button>
      </Space>}
    />
    <Card
      style={{height: '90vh', overflowY: 'auto'}}
    >
      <WorkFlow value={value} onChange={onChange} />
    </Card>
  </>;
};

export default Detail;
