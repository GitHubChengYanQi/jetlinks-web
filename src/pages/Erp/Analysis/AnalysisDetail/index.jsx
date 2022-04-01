import React, {useEffect, useState} from 'react';
import {Alert, Card, Spin} from 'antd';
import Recommended from '@/pages/Erp/Analysis/Recommended';
import OweSku from '@/pages/Erp/Analysis/OweSku';
import Empty from '@/components/Empty';
import {useRequest} from '@/util/Request';

const AnalysisDetail = ({value}) => {

  if (typeof value !== 'object') {
    return <Empty/>;
  }

  return <>
    <div style={{maxHeight: 'calc(100vh - 110px)', overflow: 'auto'}}>
      <Card title='生产推荐' bordered={false}>
        <Recommended data={value.result}/>
      </Card>
      <Card title='缺料信息' bordered={false}>
        <OweSku data={value.owe}/>
      </Card>
    </div>
  </>;
};

export default AnalysisDetail;
