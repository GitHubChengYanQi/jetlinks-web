import React, {useState} from 'react';
import {useHistory, useParams} from 'ice';
import {Button, Card, notification, Space} from 'antd';
import WorkFlow from '@/pages/ReSearch/BOM/WorkFlow';
import {useRequest} from '@/util/Request';

const Detail = (props) => {

  const params = useParams();

  const history = useHistory();

  const [value, onChange] = useState();

  const {loading,run} = useRequest({
    url:'/shipRoute/add',
    method:'POST',
  },{
    manual:true,
    onSuccess:()=>{
      history.push('/SPU/processRoute');
      notification.success({
        message: '保存成功！',
      });
    },
    onError:()=>{
      notification.success({
        message: '保存失败！',
      });
    }
  });

  return <>
    <Card
      bodyStyle={{padding: 0}}
      extra={<Space>
        <Button loading={loading} type="primary" onClick={() => {
          run({
            data:value
          });
        }}>保存</Button>
        <Button onClick={() => {
          history.push('/SPU/processRoute');
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
