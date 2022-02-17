import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'ice';
import {Button, Card, notification, Space} from 'antd';
import WorkFlow from '@/pages/ReSearch/BOM/WorkFlow';
import {useRequest} from '@/util/Request';

const Detail = () => {

  const params = useParams();

  const history = useHistory();

  const [value, onChange] = useState();

  const {run: detailRun} = useRequest({
    url: '/shipRoute/shipDetail',
    method: 'GET'
  }, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
    }
  });

  const {loading, run} = useRequest({
    url: '/shipRoute/add',
    method: 'POST',
  }, {
    manual: true,
    onSuccess: () => {
      history.push('/SPU/processRoute');
      notification.success({
        message: '保存成功！',
      });
    },
    onError: () => {
      notification.success({
        message: '保存失败！',
      });
    }
  });

  useEffect(() => {
    if (params.id && params.id !== 'add') {
      detailRun({
        params: {
          id: params.id,
        }
      });
    }
  }, []);


  return <>
    <Card
      bodyStyle={{padding: 0}}
      extra={<Space>
        <Button loading={loading} type="primary" onClick={() => {
          run({
            data: value
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
