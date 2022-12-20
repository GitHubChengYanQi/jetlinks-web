import React from 'react';
import {Col, Row} from 'antd';
import NumberReport from '@/pages/statistical/components/Platform/components/NumberReport';
import DeviceReport from '@/pages/statistical/components/Platform/components/DeviceReport';
import CategoryReport from '@/pages/statistical/components/Platform/components/CategoryReport';
import InOutDeviceReport from '@/pages/statistical/components/Platform/components/InOutDeviceReport';
import CategoryNumber from '@/pages/statistical/components/Platform/components/CategoryNumber';

const Platform = () => {

  return <div style={{backgroundColor: '#fff', padding: 24}}>
    <Row gutter={24}>
      <Col span={6}>
        <NumberReport/>
      </Col>
      <Col span={9}>
        <DeviceReport/>
      </Col>
      <Col span={9}>
        <CategoryReport/>
      </Col>
    </Row>
    <div style={{height: 24}}/>
    <Row gutter={24}>
      <Col span={20}>
        <InOutDeviceReport/>
      </Col>
      <Col span={4}>
        <CategoryNumber/>
      </Col>
    </Row>
  </div>;
};

export default Platform;
