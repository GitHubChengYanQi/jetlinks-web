import React from 'react';
import {useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, Card} from 'antd';
import {useRequest} from '@/util/Request';
import {partsDetail} from '@/pages/Erp/parts/PartsUrl';
import Empty from '@/components/Empty';
import WorkFlow from '@/pages/ReSearch/BOM/WorkFlow';

const Detail = (props) => {

  const params = useParams();

  const {loading, data} = useRequest(partsDetail, {defaultParams: {data: {partsId: params.cid}}});

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }
  if (!data) {
    return <Empty />;
  }

  return <>
    <Card
      bodyStyle={{padding:0}}
      title={data.partName}
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
