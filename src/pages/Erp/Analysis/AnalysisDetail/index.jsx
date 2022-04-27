import React, {useEffect} from 'react';
import {Alert, Card, Descriptions, Progress, Space, Spin} from 'antd';
import Recommended from '@/pages/Erp/Analysis/Recommended';
import OweSku from '@/pages/Erp/Analysis/OweSku';
import Empty from '@/components/Empty';
import {useRequest} from '@/util/Request';
import Note from '@/components/Note';
import TaskProgress from '@/pages/Erp/Analysis/TaskList/components/TaskProgress';

const AnalysisDetail = (
  {
    value,
    onSuccess = () => {
    }
  }) => {

  const {loading, data, run, cancel} = useRequest({
    url: '/asynTask/detail',
    method: 'POST'
  }, {
    manual: true,
    pollingInterval: 5000,
    onSuccess: (res) => {
      if (res.allCount === res.count) {
        cancel();
      }
      onSuccess(res.allBomResult);
    }
  });

  useEffect(() => {
    if (value) {
      run({data: {taskId: value}});
    }
  }, []);

  if (!data && loading) {
    return <Spin spinning={loading}>
      <Alert
        style={{padding: 24, margin: 24, width: 500}}
        message='正在加载分析数据，请稍后...'
      />
    </Spin>;
  }

  if (!data) {
    return <Empty style={{width: 500, padding: 24}}/>;
  }

  if (data.allCount !== data.count) {
    return <TaskProgress data={data} title='分析中' />;
  }

  if (!data.allBomResult) {
    return <Empty/>;
  }

  return <>
    <div style={{maxHeight: 'calc(100vh - 110px)', overflow: 'auto', width: 1100}}>
      <Card title='分析物料' bordered={false} bodyStyle={{padding:24}}>
        <Descriptions column={4} labelStyle={{width:20}}>
          {
            data.allBomResult.view && data.allBomResult.view.map((item, index) => {
              return <Descriptions.Item key={index} label={index + 1}>
                <Space align='start'>
                  <Note width={170}>{item.name}</Note>
                  <div>
                    × {item.num}
                  </div>
                </Space>
              </Descriptions.Item>;
            })
          }
        </Descriptions>
      </Card>
      <Card title='生产推荐' bordered={false}>
        <Recommended data={data.allBomResult.result}/>
      </Card>
      <Card title='缺料信息' bordered={false}>
        <OweSku data={data.allBomResult.owe}/>
      </Card>
    </div>
  </>;
};

export default AnalysisDetail;
