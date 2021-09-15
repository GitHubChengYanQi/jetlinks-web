import React, {useRef} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {EditOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Desc from '@/pages/Crm/business/BusinessDetails/compontents/Desc';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import Dynamic from '@/pages/Crm/business/BusinessDetails/compontents/Dynamic';
import CompetitorList from '@/pages/Crm/competitor/components/CompetitorTable';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {businessDetail} from '@/pages/Crm/business/BusinessUrl';
import StepList from '@/pages/Crm/business/BusinessDetails/compontents/StepList';
import {useRequest} from '@/util/Request';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import CompetitorTable from '@/pages/Crm/competitorQuote/components/competitorTable';
import styles from './index.module.scss';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();
  console.log(1111111111111, params.state === 'false');
  const ref = useRef(null);
  const refTrack = useRef(null);
  const historys = useHistory();
  const {loading, data, refresh} = useRequest(businessDetail, {
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
        <Breadcrumb/>
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

          <Button
            style={params.state === 'false' ? {'display': 'none' }: null }
            onClick={() => {
              refTrack.current.open(false);
            }} icon={<EditOutlined/>}>添加跟踪</Button>

          <Button
            style={params.state === 'false' ? {'display': 'none' }: null }
            type="primary" onClick={() => {
              ref.current.open(data.businessId);
            }}>编辑</Button>

          <CreateNewCustomer widths={1400} refModal={refTrack} model={CrmBusinessTrackEdit} onSuccess={() => {
            refTrack.current.close();
            refresh();
          }} title='跟踪' val={data}/>

          <Modal width={800} title="客户" component={BusinessEdit} onSuccess={() => {
            ref.current.close();
            refresh();
          }} ref={ref}/>
          <Button
            style={params.state === 'false' ?  null : {'display': 'none' } }
            type="primary" key="1"
            onClick={() => {
              historys.push(`/CRM/business/${data.businessId}`);
            }}>查看详情</Button>
          <Button
            // style={params.state === 'false' ? {'display': 'none' }: null }
            onClick={() => {
              history.back();
            }}><Icon type="icon-back"/>返回</Button>

        </div>

      </Card>
      <Card>
        <div style={params.state === 'false' ?  null :{'display': 'none' } }>
          <TableDetail  title='商机明细' value={data.businessId} businessId={data.businessId} onSuccess={()=>{
            refresh();
          }}/>
        </div>
      </Card>
      <div style={params.state === 'false' ? {'display': 'none' }: null }>
        <Row>
          <Col span={16}>
            <div className={styles.main}>
              <Card title="项目销售流程" bodyStyle={{padding: 30}}>
                <StepList onChange={() => {
                  refresh();
                }} value={data}/>
              </Card>
            </div>
            <div className={styles.main}>
              <Card>
                <Desc data={data}/>
              </Card>
            </div>

            <div
              className={styles.main}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="详细信息" key="1">
                    <Description data={data}/>
                  </TabPane>
                  <TabPane tab="竞争对手" key="2">
                    <CompetitorList businessId={data.businessId}/>
                  </TabPane>
                  <TabPane tab="报价" key="3">
                    <CompetitorTable businessId={data.businessId}/>
                  </TabPane>
                  <TabPane tab="商机明细" key="4">
                    <TableDetail value={data.businessId} onSuccess={()=>{}}/>
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
                    <Dynamic value={data}/>
                  </TabPane>
                  <TabPane tab="跟踪" key="2">
                    <Track value={data}/>
                  </TabPane>
                </Tabs>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

    </div>;
  }

  return null;


};

export default CustomerDetail;
