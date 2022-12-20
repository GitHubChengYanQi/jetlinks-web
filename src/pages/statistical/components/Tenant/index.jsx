import React from 'react';
import moment from 'moment';
import {Col, Row, Space} from 'antd';
import styles from './index.module.less';
import DeviceAnnular from '@/pages/statistical/components/Tenant/components/DeviceAnnular';
import DeviceColumnar from '@/pages/statistical/components/Tenant/components/DeviceColumnar';
import Map from '@/pages/statistical/components/Tenant/components/Map';
import AlarmReport from '@/pages/statistical/components/Tenant/components/AlarmReport';
import CategoryReport from '@/pages/statistical/components/Tenant/components/CategoryReport';
import AlarmRecord from '@/pages/statistical/components/Tenant/components/AlarmRecord';
import AlarmTrend from '@/pages/statistical/components/Tenant/components/AlarmTrend';

const Tenant = () => {


  return <div style={{backgroundColor: '#fff'}}>
    <div className={styles.tenant}>
      <div className={styles.header}>
        奥普泰 — 数据大屏
        <span>
          {moment(new Date()).format('YYYY年MM月DD日   hh：mm：ss')}
        </span>
      </div>
      <div className={styles.content}>
        <Row gutter={24}>
          <Col span={6}>
            <Space direction="vertical" size={24} style={{width: '100%'}}>
              <DeviceAnnular/>
              <DeviceColumnar/>
            </Space>
          </Col>
          <Col span={12}>
            <Map/>
          </Col>
          <Col span={6}>
            <Space direction="vertical" size={24} style={{width: '100%'}}>
              <AlarmReport/>
              <CategoryReport/>
            </Space>
          </Col>
        </Row>
        <div style={{height: 24}}/>
        <Row gutter={24}>
          <Col span={12}>
            <AlarmRecord/>
          </Col>
          <Col span={12}>
            <AlarmTrend/>
          </Col>
        </Row>
      </div>
    </div>

  </div>;
};

export default Tenant;
