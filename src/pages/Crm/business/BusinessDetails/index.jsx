import React, {useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs, Statistic, Divider, Input} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {useParams} from 'ice';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import {businessDetail} from '@/pages/Crm/business/BusinessUrl';
import styles from './index.module.scss';
import StepList from '@/pages/Crm/business/BusinessDetails/compontents/StepList';
import Modal2 from '@/components/Modal';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Desc from '@/pages/Crm/business/BusinessDetails/compontents/Desc';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();

  const ref = useRef(null);


  const [responsive, setResponsive] = useState(false);

  const {loading, data, run} = useRequest(businessDetail, {
    defaultParams: {
      data: {
        businessId: params.cid
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
              <h3>{data.businessName}</h3>
              <div>
                <em>立项日期：{data.time}</em>
              </div>
            </Col>
          </Row>


        </div>
        <div className={styles.titleButton}>
          <Button type="primary" onClick={() => {
            ref.current.open(data.businessId);
          }}>编辑</Button>
          <Modal2 width={1500} title="客户" component={BusinessEdit} onSuccess={() => {
            ref.current.close();
          }} ref={ref} />
          <Button onClick={() => {
            history.back();
          }}><Icon type="icon-back" /> 返回</Button>
        </div>
      </Card>

      <div className={styles.main}>
        <Card title="商机销售流程" bodyStyle={{padding: 30}}>
          <StepList salesId={data.salesId} />
        </Card>
      </div>
      <div className={styles.main}>
        <Card>
          <Desc data={data}/>
        </Card>
      </div>
      <div className={styles.main}>

        <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
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
              </Tabs>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Tabs defaultActiveKey="2">
                <TabPane tab="相关团队" key="1">
                  Content of Tab Pane 1
                  <Input />相关团队
                </TabPane>
                <TabPane tab="跟进动态" key="2">

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
