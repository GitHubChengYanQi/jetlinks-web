import React from 'react';
import {Avatar, Button, Card, Col, Divider, List, Row, Space, Statistic} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './index.module.scss';

const Overview = () => {

  const renderTitle = () => {
    return (
      <div>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />项目标题
      </div>
    );
  };

  return (
    <div>
      <Card>
        <Breadcrumb title="工作台" />
      </Card>
      <Card>
        <Row justify="space-between">
          <Col>
            <Row gutter={24}>
              <Col>
                <Avatar size={64} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png">头像</Avatar>
              </Col>
              <Col>
                <h3 className={styles.sayHi}>早安，吴彦祖，祝你开心每一天！</h3>
                <div>
                  <em>交互专家 |蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</em>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className={styles.statistic}>
            <Space split={<Divider type="vertical" />}>
              <Statistic title="项目数" value={93} suffix="/132" />
              <Statistic title="团队排名" value={3} suffix="/12" />
            </Space>
          </Col>
        </Row>
      </Card>
      <div className={styles.overviewWrapper}>

        <Row gutter={24}>
          <Col span={16}>
            <Card title="进行中的项目" extra={<a href="#">全部项目</a>} style={{marginBottom:24}}>
              {[1, 2, 3, 4, 5, 6].map(() => {
                return (
                  <Card.Grid className={styles.gridStyle}>
                    <Card.Meta
                      // avatar={}
                      title={renderTitle()}
                      description="那是一种内在的东西，他们到达不了，也无法触及的"
                    />
                  </Card.Grid>
                );
              })}</Card>

            <Card title="动态">
              <List
                itemLayout="horizontal"
                dataSource={[1, 2, 3, 4, 5, 6]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<div>朱彦祖 <a href="https://ant.design">新建了客户</a></div>}
                      description="几秒前"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="快速开始 / 便捷导航">
              <Space split={<Divider type="vertical" />}>
                <Button type="text">营销</Button>
                <Button type="text">智造</Button>
                <Button type="text">进销存</Button>
                <Button type="text">售后</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Overview;
