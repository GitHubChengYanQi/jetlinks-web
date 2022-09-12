import React from 'react';
import {Button, Card, Col, Row, Space} from 'antd';
import Demo from '@/pages/statistical/components/Demo';

const bodyStyle = {
  padding: 0
};

const Statistical = () => {


  return <Space direction="vertical" style={{width: '100%'}} size={24}>
    <Row gutter={24}>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="设备总览" extra={<Button type="link">查看详情</Button>}>
          <Demo id='1'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="报警概览" extra={<Button type="link">查看详情</Button>}>
          <Demo id='2'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="实时报警" extra={<Button type="link">查看详情</Button>}>
          <Demo id='3'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="日志推送" extra={<Button type="link">查看详情</Button>}>
          <Demo id='4'/>
        </Card>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="设备类别" extra={<Button type="link">查看详情</Button>}>
          <Demo id='5'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="报警类别" extra={<Button type="link">查看详情</Button>}>
          <Demo id='6'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="绑定情况" extra={<Button type="link">查看详情</Button>}>
          <Demo id='7'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="升级推送" extra={<Button type="link">查看详情</Button>}>
          <Demo id='8'/>
        </Card>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="上报数据状态" extra={<Button type="link">查看详情</Button>}>
          <Demo id='9'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="上报数据状态" extra={<Button type="link">查看详情</Button>}>
          <Demo id='10'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="上报数据状态" extra={<Button type="link">查看详情</Button>}>
          <Demo id='12'/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bodyStyle={bodyStyle} title="上报数据状态" extra={<Button type="link">查看详情</Button>}>
          <Demo id='13'/>
        </Card>
      </Col>
    </Row>
  </Space>;
};

export default Statistical;
