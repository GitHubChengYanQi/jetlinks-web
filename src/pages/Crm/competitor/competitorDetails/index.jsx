import React, {useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs, Statistic, Divider} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import Desc from '@/pages/Crm/competitor/competitorDetails/components/Desc';
import {competitorDetail} from '@/pages/Crm/competitor/competitorUrl';
import CompetitorEdit from '@/pages/Crm/competitor/competitorEdit';
import Modal from '@/components/Modal';
import styles from './index.module.scss';
import Description from '@/pages/Crm/competitor/competitorDetails/components/Description';
const {TabPane} = Tabs;

const CompetitorDetails = () => {
  const params = useParams();


  const [responsive, setResponsive] = useState(false);

  const ref = useRef(null);

  const {loading, data, run,refresh} = useRequest(competitorDetail, {
    defaultParams: {
      data: {
        competitorId: params.cid
      }
    }
  });



  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (data){
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
                <h3>{data.name}</h3>
                <div>
                  <em>创立日期：{data.creationDate}</em>
                </div>
              </Col>
            </Row>

          </div>
          <div className={styles.titleButton}>
            <Button type="primary" onClick={() => {
              ref.current.open(data.competitorId);
            }}>编辑</Button>
            <Modal width={1000} title="客户" component={CompetitorEdit} onSuccess={() => {
              ref.current.close();
              refresh();
            }} ref={ref} />
            <Button onClick={() => {
              history.back();
            }}><Icon type="icon-huifu" />返回</Button>
          </div>
        </Card>
        <div
          className={styles.main}>
          <Card>
            <Desc data={data} />
          </Card>
        </div>
        <div
          className={styles.main}>
          <Row gutter={12}>
            <Col span={16}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="详细信息" key="1">
                    <Description data={data} />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="动态" key="1">
                    {/*<Dynamic value={data} />*/}
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>


        </div>

      </div>

    );
  }else {
    return null;
  }

};

export default CompetitorDetails;
