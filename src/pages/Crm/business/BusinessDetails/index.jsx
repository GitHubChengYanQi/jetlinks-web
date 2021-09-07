import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs, Statistic} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {useParams} from 'ice';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import {businessDetail} from '@/pages/Crm/business/BusinessUrl';
import styles from './index.module.scss';
import StepList from '@/pages/Crm/business/BusinessDetails/compontents/StepList';
import Modal from '@/components/Modal';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Desc from '@/pages/Crm/business/BusinessDetails/compontents/Desc';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import AvatarList from '@/pages/Crm/business/BusinessDetails/compontents/Avatar';
import Dynamic from '@/pages/Crm/business/BusinessDetails/compontents/Dynamic';
import CompetitorList from '@/pages/Crm/competitor/competitorList';
import {EditOutlined} from '@ant-design/icons';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();

  const ref = useRef(null);
  const refTrack = useRef(null);




  const [responsive, setResponsive] = useState(false);

  const {loading, data, run, refresh} = useRequest(businessDetail, {
    defaultParams: {
      data: {
        businessId: params.cid
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }
  if (data) {
    return <div className={styles.detail}>
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

          <Button onClick={() => {
            refTrack.current.open(false);
          }} icon={<EditOutlined />}>添加跟踪</Button>

          <Button type="primary" onClick={() => {
            ref.current.open(data.businessId);
          }}>编辑</Button>

          <Modal width={1000} component={CrmBusinessTrackEdit} onSuccess={() => {
            refTrack.current.close();
            refresh();
          }} ref={refTrack} val={data} />

          <Modal width={1500} title="客户" component={BusinessEdit} onSuccess={() => {
            ref.current.close();
            refresh();
          }} ref={ref} />
          <Button onClick={() => {
            history.back();
          }}><Icon type="icon-back" />返回</Button>
        </div>
      </Card>

      <Row>
        <Col span={16}>
          <div className={styles.main}>
            <Card title="商机销售流程" bodyStyle={{padding: 30}}>
              <StepList onChange={() => {
                refresh();
              }} value={data} />
            </Card>
          </div>
          <div className={styles.main}>
            <Card>
              <Desc data={data} />
            </Card>
          </div>
       
          <div
            className={styles.main}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="详细信息" key="1">
                  <Description data={data} />
                </TabPane>
                <TabPane tab="竞争对手" key="2">
                  <CompetitorList data={data} />
                </TabPane>
              </Tabs>
            </Card>


          </div>
        </Col>
        <Col span={8}>
          <div className={styles.main} style={{height: '100%'}}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="动态" key="1">
                  <Dynamic value={data} />
                </TabPane>
                <TabPane tab="跟踪" key="2">
                  <Track value={data}  />
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </Col>
      </Row>

    </div>;
  }
  return null;


};

export default CustomerDetail;
