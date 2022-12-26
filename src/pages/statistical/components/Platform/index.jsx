import React from 'react';
import {Col, Row} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import NumberReport from '@/pages/statistical/components/Platform/components/NumberReport';
import DeviceReport from '@/pages/statistical/components/Platform/components/DeviceReport';
import CategoryReport from '@/pages/statistical/components/Platform/components/CategoryReport';
import InOutDeviceReport from '@/pages/statistical/components/Platform/components/InOutDeviceReport';
import CategoryNumber from '@/pages/statistical/components/Platform/components/CategoryNumber';
import {useRequest} from '@/util/Request';
import {sysView} from '@/pages/statistical/url';

const Platform = () => {

  const {loading, data = {}} = useRequest(sysView);

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  return <div style={{backgroundColor: '#fff', padding: 24}}>
    <Row gutter={24}>
      <Col span={6}>
        <NumberReport data={data} />
      </Col>
      <Col span={9}>
        <DeviceReport deviceData={data} />
      </Col>
      <Col span={9}>
        <CategoryReport categoryResults={data.categoryResults} />
      </Col>
    </Row>
    <div style={{height: 24}} />
    <Row gutter={24}>
      <Col span={20}>
        <InOutDeviceReport categoryResults={data.categoryResults} />
      </Col>
      <Col span={4}>
        <CategoryNumber categoryResults={data.categoryResults} />
      </Col>
    </Row>
  </div>;
};

export default Platform;
