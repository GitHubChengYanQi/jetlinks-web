import React, {useEffect, useRef, useState} from 'react';
import {Anchor, Avatar, Button, Card, Col, Row, Tabs} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {EditOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Desc from '@/pages/Crm/business/BusinessDetails/compontents/Desc';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import CompetitorList from '@/pages/Crm/competitor/components/CompetitorTable';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {businessDelete, businessDetail} from '@/pages/Crm/business/BusinessUrl';
import StepList from '@/pages/Crm/business/BusinessDetails/compontents/StepList';
import {useRequest} from '@/util/Request';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import CompetitorTable from '@/pages/Crm/competitorQuote/components/competitorTable';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import CustomerMenu from '@/pages/Crm/customer/CustomerDetail/compontents/CustomerMenu';
import styles from './index.module.scss';
import Dynamic from '@/pages/Crm/customer/CustomerDetail/compontents/Dynamic';

const {TabPane} = Tabs;
const {Link} = Anchor;

const CustomerDetail = () => {
  const params = useParams();
  const ref = useRef(null);
  const refTrack = useRef(null);
  const submitRef = useRef(null);
  const history = useHistory();

  const [width, setWidth] = useState();

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
        <Breadcrumb />
      </Card>
      <Card>
        <div className={styles.title}>
          <Row gutter={24}>
            <Col>
              <Avatar size={64}>{data.businessName.substring(0, 1)}</Avatar>
            </Col>
            <Col>
              <h3>{data.businessName}</h3>
              <div>
                <em>创建日期：{data.createTime}</em>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.titleButton}>
          <CustomerMenu data={data} api={businessDelete} title="删除项目" url="/CRM/business" />
          <Button
            type="primary"
            style={params.state === 'false' ? {'display': 'none'} : null}
            onClick={() => {
              refTrack.current.open(false);
            }} icon={<EditOutlined />}>添加跟进</Button>

          <Modal
            width={width === 1 ? 1400 : 800}
            title="跟进"
            ref={refTrack}
            compoentRef={submitRef}
            footer={
              <>
                <Button type="primary" onClick={() => {
                  submitRef.current.formRef.current.submit();
                }}>
                  保存
                </Button>
                <Button onClick={() => {
                  refTrack.current.close();
                }}>
                  取消
                </Button>
              </>}
            component={CrmBusinessTrackEdit}
            onSuccess={() => {
              refTrack.current.close();
              refresh();
            }} val={data.customerId}
            onWidthChange={(value) => {
              setWidth(value);
            }} id={data.businessId} number={1} />
          <Button
            style={params.state === 'false' ? null : {'display': 'none'}}
            type="primary" key="1"
            onClick={() => {
              history.push(`/CRM/business/${data.businessId}`);
            }}>查看详情</Button>
          <Button
            style={params.state === 'false' ? {'display': 'none'} : null}
            onClick={() => {
              history.push('/CRM/business');
            }}><Icon type="icon-back" />返回</Button>
          <Button
            style={params.state === 'false' ? null : {'display': 'none'}}
            onClick={() => {
              history.push(`/CRM/business/${data.businessId}/${true}`);
              refresh();
            }}><Icon type="icon-back" />返回</Button>
        </div>

      </Card>
      <Card>
        <div style={params.state === 'false' ? null : {'display': 'none'}}>
          <TableDetail title="商机明细" value={data.businessId} businessId={data.businessId} onSuccess={() => {
            refresh();
          }} />
        </div>
      </Card>
      <div style={params.state === 'false' ? {'display': 'none'} : null}>
        <Row>
          <Col span={16}>
            <div className={styles.main}>
              <StepList onChange={() => {
                refresh();
              }} value={data} />
            </div>
            <div className={styles.main}>
              <Card>
                <Desc data={data} />
              </Card>
            </div>

            <div
              id="page"
              className={styles.main}>
              <Card>
                {params.state === 'true' ? <Tabs defaultActiveKey="4">
                  <TabPane tab="详细信息" key="1">
                    <Description data={data} />
                  </TabPane>
                  <TabPane tab="竞争对手" key="2">
                    <CompetitorList businessId={data.businessId} />
                  </TabPane>
                  <TabPane tab="报价" key="3">
                    <CompetitorTable businessId={data.businessId} />
                  </TabPane>
                  <TabPane tab="商机明细" key="4">
                    <TableDetail value={data.businessId} onSuccess={() => {
                    }} />
                  </TabPane>
                </Tabs> : <Tabs defaultActiveKey="1">
                  <TabPane tab="详细信息" key="1">
                    <Description data={data} />
                  </TabPane>
                  <TabPane tab="竞争对手" key="2">
                    <CompetitorList businessId={data.businessId} />
                  </TabPane>
                  <TabPane tab="报价" key="3">
                    <CompetitorTable businessId={data.businessId} />
                  </TabPane>
                  <TabPane tab="商机明细" key="4">
                    <TableDetail value={data.businessId} onSuccess={() => {
                    }} />
                  </TabPane>
                </Tabs>}
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.main} style={{height: '100%'}}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="动态" key="1">
                    <Dynamic value={data} api={{
                      url: '/businessDynamic/list', method: 'POST'
                    }} />
                  </TabPane>
                  <TabPane tab="跟进" key="2">
                    <Track value={data.businessId} number={1} />
                  </TabPane>
                </Tabs>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

    </div>;
  }

  return '暂无项目';


};

export default CustomerDetail;
