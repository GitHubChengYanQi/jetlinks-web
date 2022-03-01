import React from 'react';
import {Divider, Space, Spin, Statistic} from 'antd';
import {useRequest} from '@/util/Request';

const BusinessNumber = () => {

  const {loading, data} = useRequest({url: '/crmBusiness/listAll', method: 'POST'});

  if (loading) {
    return (<Spin />);
  }

  return (
    <Space split={<Divider type="vertical" />}>
      <Statistic title="项目数" value={data} />
      <Statistic title="团队排名" value={1} suffix="/12" />
    </Space>
  );
};
export default BusinessNumber;
