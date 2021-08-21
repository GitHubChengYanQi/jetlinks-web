import React, {useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs, Statistic} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {useParams} from 'ice';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import styles from './index.module.scss';
import Modal2 from '@/components/Modal';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import {repairDetail} from '@/pages/Portal/repair/repairUrl';

const {TabPane} = Tabs;

const RepairDetails = () => {
  const params = useParams();

  const ref = useRef(null);

  const [responsive, setResponsive] = useState(false);

  const {loading, data, run, refresh} = useRequest(repairDetail, {
    defaultParams: {
      data: {
        repairId: params.cid
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
              {/*<h3>{data.businessName}</h3>*/}
              <div>
                {/*<em>立项日期：{data.time}</em>*/}
              </div>
            </Col>
          </Row>


        </div>
        <div className={styles.titleButton}>
          <Button type="primary" onClick={() => {
            // ref.current.open(data.businessId);
          }}>编辑</Button>
          <Modal2 width={1500} title="客户" component={BusinessEdit} onSuccess={() => {
            ref.current.close();
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
              {/*<StepList onChange={() => {*/}
              {/*  refresh();*/}
              {/*}} value={data} />*/}
            </Card>
          </div>
          <div className={styles.main}>
            <Card>
              {/*<Desc data={data} />*/}
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
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="详细信息" key="1">
                  {/*<Description data={data} />*/}
                </TabPane>
              </Tabs>
            </Card>


          </div>
        </Col>
        <Col span={8}>
          <div className={styles.main} style={{height:'100%'}}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="动态" key="1">
                  {/*<Dynamic value={data} />*/}
                </TabPane>
                <TabPane tab="跟踪" key="2">
                  {/*<Track value={data} />*/}
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

export default RepairDetails;
