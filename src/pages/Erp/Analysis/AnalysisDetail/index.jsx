import React, {useEffect} from 'react';
import {Alert, Card, Progress, Spin} from 'antd';
import Recommended from '@/pages/Erp/Analysis/Recommended';
import OweSku from '@/pages/Erp/Analysis/OweSku';
import Empty from '@/components/Empty';
import {useRequest} from '@/util/Request';

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
      onSuccess(res);
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
    return <Empty style={{width:500,padding:24}}/>;
  }

  if (data.allCount !== data.count) {
    return <div style={{width: 500, textAlign: 'center', padding: 24}}>
      <Progress
        width={120}
        type="circle"
        format={percent => {
          return <div style={{fontSize: 16}}>
            {`分析中 ${percent}%`}
          </div>;
        }}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={(Math.floor((data.count / data.allCount) * 100))}
      />
    </div>;
  }

  if (!data.allBomResult) {
    return <Empty/>;
  }

  return <>
    <div style={{maxHeight: 'calc(100vh - 110px)', overflow: 'auto', width: 1100}}>
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