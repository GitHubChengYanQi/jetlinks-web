import React from 'react';
import {Avatar, Button, Card, Col, Row, Tabs} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';
import {useParams} from 'ice';

import ProSkeleton from '@ant-design/pro-skeleton';
import styles from './index.module.scss';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();

  console.log(params);

  const {loading, data, run} = useRequest(customerDetail, {
    defaultParams: {
      data: {
        customerId: params.cid
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <div className={styles.detail}>
      <Card>
        <Breadcrumb />
      </Card>
      <Card>
        <div className={styles.title}>
          <Row gutter={24}>
            <Col>
              <Avatar size={64}>LOGO</Avatar>
            </Col>
            <Col>
              <h3>{data.customerName}</h3>
              <div>
                <em>{data.signIn}</em>
              </div>
            </Col>
          </Row>

        </div>
        <div className={styles.titleButton}>
          <Button type="primary">编辑</Button>
          <Button onClick={() => {
            history.back();
          }}><Icon type="icon-back" /> 返回</Button>
        </div>
      </Card>
      <div
        className={styles.main}>
        <Card
        >
          基础数据
        </Card>
      </div>
      <div
        className={styles.main}>
        <Card
        >
          一些统计数据放这里
        </Card>
      </div>
      <div
        className={styles.main}>
        <Row gutter={12}>
          <Col span={16}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="详细信息" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="联系人" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="地址" key="3">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="合同" key="4">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="订单" key="5">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="回款" key="6">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="附件" key="7">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="动态" key="1">
                  Content of Tab Pane 1
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>


      </div>

    </div>

  );
};

export default CustomerDetail;
