import React, {useState} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs, Statistic, Divider} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';
import {useParams} from 'ice';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import ProSkeleton from '@ant-design/pro-skeleton';
import styles from './index.module.scss';
import Description from '@/pages/Crm/customer/CustomerDetail/compontents/Description';
import Desc from '@/pages/Crm/customer/CustomerDetail/compontents/Desc';
import ContactsList from '@/pages/Crm/customer/CustomerEdit/components/ContactsList';
import AdressList from '@/pages/Crm/customer/CustomerEdit/components/AdressList';
import Contract from '@/pages/Crm/customer/CustomerDetail/compontents/Contract';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();


  const [responsive, setResponsive] = useState(false);

  const {loading, data, run} = useRequest(customerDetail, {
    defaultParams: {
      data: {
        customerId: params.cid
      }
    }
  });

  console.log(data);

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
          <Desc data={data} />
        </Card>
      </div>
      <div
        className={styles.main}>

          <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
            <ProCard>
              <Statistic title="今日UV" value={79.0} precision={2} />
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard>
              <Statistic title="冻结金额" value={112893.0} precision={2} />
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard>
              <Statistic title="信息完整度" value={93} suffix="/ 100" />
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard>
              <Statistic title="冻结金额" value={112893.0} />
            </ProCard>
          </ProCard.Group>
      </div>
      <div
        className={styles.main}>
        <Row gutter={12}>
          <Col span={16}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="详细信息" key="1">
                 <Description data={data}/>
                </TabPane>
                <TabPane tab="联系人" key="2">
                  <ContactsList customerId={data.customerId}  />
                </TabPane>
                <TabPane tab="地址" key="3">
                  <AdressList customerId={data.customerId}/>
                </TabPane>
                <TabPane tab="合同" key="4">
                 <Contract customerId={data.customerId} />
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
