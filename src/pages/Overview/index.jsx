import React from 'react';
import {Avatar, Button, Card, Col, Divider, List, Row, Space} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Nav from '@/pages/Overview/components/Nav';
import Head from '@/pages/Overview/components/Head';
import Business from '@/pages/Overview/components/Business';
import styles from './index.module.scss';
import Dynamic from '@/pages/Overview/components/Dynamic';

const Overview = () => {


  return (
    <div>
      <Card>
        <Breadcrumb title="工作台" />
      </Card>
      <Card>
        <Head />
      </Card>
      <div className={styles.overviewWrapper}>
        <Row gutter={24}>
          <Col span={16}>

            <Business />

            <Dynamic />

          </Col>
          <Col span={8}>
            <Nav />
          </Col>
        </Row>
      </div>
    </div>
  );

};

export default Overview;
