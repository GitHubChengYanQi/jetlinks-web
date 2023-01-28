import React from 'react';
import moment from 'moment';
import {Col, Row, Space} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import styles from './index.module.less';
import DeviceAnnular from '@/pages/statistical/components/Tenant/components/DeviceAnnular';
import DeviceColumnar from '@/pages/statistical/components/Tenant/components/DeviceColumnar';
import AlarmReport from '@/pages/statistical/components/Tenant/components/AlarmReport';
import CategoryReport from '@/pages/statistical/components/Tenant/components/CategoryReport';
import AlarmRecord from '@/pages/statistical/components/Tenant/components/AlarmRecord';
import AlarmTrend from '@/pages/statistical/components/Tenant/components/AlarmTrend';
import {useRequest} from '@/util/Request';
import {customerView} from '@/pages/statistical/url';
import Bmap from '@/components/Bmap';

const Tenant = ({customer = {}}) => {

  const {loading, data = {}} = useRequest(customerView);

  if (loading) {
    return <ProSkeleton type="descriptions"/>;
  }

  const getWeek = (date) => { // 参数时间戳
    const week = moment(date).day();
    switch (week) {
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return '星期三';
      case 4:
        return '星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
      default:
        return '星期日';
    }
  };
  return <div style={{backgroundColor: '#fff'}}>
    <div className={styles.tenant}>
      <div className={styles.header}>
        {customer.resetName || '奥普泰 — 数据大屏'}
        <span>
          {moment(new Date()).format('YYYY年MM月DD日   hh:mm:ss')} {getWeek(new Date())}
        </span>
      </div>
      <div className={styles.content}>
        <Row gutter={24}>
          <Col span={6}>
            <Space direction="vertical" size={24} style={{width: '100%'}}>
              <DeviceAnnular deviceData={data}/>
              <DeviceColumnar records={data.records}/>
            </Space>
          </Col>
          <Col span={12}>
            <Bmap/>
          </Col>
          <Col span={6}>
            <Space direction="vertical" size={24} style={{width: '100%'}}>
              <AlarmReport alarmData={data.alarm}/>
              <CategoryReport categoryResults={data.categoryResults}/>
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
