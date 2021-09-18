import React from 'react';
import {Divider, Space, Statistic} from 'antd';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';

const BusinessNumber = () => {

  const {loading,data} = useRequest({url: '/crmBusiness/listAll', method: 'POST'});

  if (loading){
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <Space split={<Divider type="vertical" />}>
      <Statistic title="项目数" value={data} />
      <Statistic title="团队排名" value={1} suffix="/12" />
    </Space>
  );
};
export default BusinessNumber;
