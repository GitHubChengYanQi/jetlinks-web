import React, {useState} from 'react';
import {useParams} from 'ice';
import {Button, Card} from 'antd';
import WorkFlow from '@/pages/ReSearch/BOM/WorkFlow';

const Detail = (props) => {

  const params = useParams();

  const [value,onChange] = useState();

  return <>
    <Card
      bodyStyle={{padding:0}}
      extra={<Button type="primary" onClick={()=>{
        console.log(value);
      }}>保存</Button>}
    />
    <Card
      style={{height: '90vh', overflowY: 'auto'}}
    >
      <WorkFlow value={value} onChange={onChange} />
    </Card>
  </>;
};

export default Detail;
