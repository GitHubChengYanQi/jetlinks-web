import React, {useEffect} from 'react';
import {Card, Descriptions} from 'antd';
import {getSearchParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import Label from '@/components/Label';
import Breadcrumb from '@/components/Breadcrumb';
import {useRequest} from '@/util/Request';
import {productionPlanDetail} from '@/pages/Production/Url';
import Empty from '@/components/Empty';


const PlanDetail = () => {

  const params = getSearchParams();

  const {loading, data, run} = useRequest(productionPlanDetail, {manual: true});
  console.log(data);

  useEffect(() => {
    if (params.id) {
      run({data: {productionPlanId: params.id}});
    }
  }, []);

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  if (!data) {
    return <Empty />;
  }

  return <>
    <Card title={<Breadcrumb title="生产计划详情" />}>
      <Card title="基本信息" bordered={false}>
        <Descriptions>
          <Descriptions.Item label={<Label>计划编号</Label>}>{data.coding}</Descriptions.Item>
          <Descriptions.Item label={<Label>主题</Label>}>{data.theme}</Descriptions.Item>
          <Descriptions.Item label={<Label>负责人</Label>}>{data.userResult && data.userResult.name}</Descriptions.Item>
          <Descriptions.Item label={<Label>执行时间</Label>}>{data.executionTime}</Descriptions.Item>
          <Descriptions.Item label={<Label>创建时间</Label>}>{data.createTime}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="生产信息" bordered={false}>

      </Card>
      <Card title="生产工序" bordered={false}>

      </Card>
    </Card>

  </>;
};

export default PlanDetail;
