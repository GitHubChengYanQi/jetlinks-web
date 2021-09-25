import React, {useEffect, useRef, useState} from 'react';
import {Anchor, Avatar, Button, Card, Col, Row, Tabs} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {EditOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Desc from '@/pages/Crm/business/BusinessDetails/compontents/Desc';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import Dynamic from '@/pages/Crm/business/BusinessDetails/compontents/Dynamic';
import CompetitorList from '@/pages/Crm/competitor/components/CompetitorTable';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {businessDelete, businessDetail} from '@/pages/Crm/business/BusinessUrl';
import StepList from '@/pages/Crm/business/BusinessDetails/compontents/StepList';
import {useRequest} from '@/util/Request';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import CompetitorTable from '@/pages/Crm/competitorQuote/components/competitorTable';
import styles from './index.module.scss';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import TableDetailEdit from '@/pages/Crm/business/BusinessEdit/components/TableDetailEdit';
import CustomerMenu from '@/pages/Crm/customer/CustomerDetail/compontents/CustomerMenu';

const {TabPane} = Tabs;
const {Link} = Anchor;

const CustomerDetail = () => {
  const params = useParams();
  const ref = useRef(null);
  const refTrack = useRef(null);
  const submitRef = useRef(null);
  const history = useHistory();

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
          <CustomerMenu data={data} api={businessDelete} title='删除项目' url='/CRM/business' />
          <Button
            style={params.state === 'false' ? {'display': 'none' }: null }
            onClick={() => {
              refTrack.current.open(false);
            }} icon={<EditOutlined/>}>添加跟进</Button>

          <Modal width={1200} title="跟进"
            ref={refTrack}
            compoentRef={submitRef}
            footer={
              <>
                <Button type="primary" onClick={()=>{
                  submitRef.current.formRef.current.submit();
                }}  >
                  保存
                </Button>
                <Button onClick={()=>{
                  refTrack.current.close();
                }}  >
                  取消
                </Button>
              </>}
            component={CrmBusinessTrackEdit} onSuccess={() => {
              refTrack.current.close();
              refresh();
            }} val={data.customerId} number={1}/>
          {/* <Button */}
          {/*  style={params.state === 'false' ? {'display': 'none' }: null } */}
          {/*  type="primary" onClick={() => {* /}
          {/*    ref.current.open(data.businessId); */}
          {/*  }}>编辑</Button> */}
          {/* <Modal width={700} title="项目" */}
          {/*  component={TableDetailEdit} */}
          {/*  compoentRef={submitRef} */}
          {/*  footer={* /}
          {/*    <> */}
          {/*      <Button type="primary" onClick={()=>{ */}
          {/*        submitRef.current.formRef.current.submit(); */}
          {/*      }}  > */}
          {/*      保存 */}
          {/*      </Button> */}
          {/*      <Button onClick={()=>{ */}
          {/*        ref.current.close(); */}
          {/*      }}  > */}
          {/*      取消 */}
          {/*      </Button> */}
          {/*    </>} */}
          {/*  onSuccess={() => { */}
          {/*    ref.current.close(); */}
          {/*    refresh(); */}
          {/*  }} ref={ref}/> */}
          <Button
            style={params.state === 'false' ?  null : {'display': 'none' } }
            type="primary" key="1"
            onClick={() => {
              history.push(`/CRM/business/${data.businessId}`);
            }}>查看详情</Button>
          <Button
            style={params.state === 'false' ? {'display': 'none' }: null }
            onClick={() => {
              history.push(`/CRM/business`);
            }}><Icon type="icon-back"/>返回</Button>
          {/*<Anchor affix={false}>*/}
          {/*  <Link href={`${`${window.location.href.substring(0, window.location.href.lastIndexOf('/'))}/#page`}`}  title='返回'/>*/}
          {/*</Anchor>*/}
          <Button
            style={params.state === 'false' ? null : {'display': 'none' }}
            onClick={() => {
              history.push(`/CRM/business/${data.businessId}/${true}`);
              refresh();
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
              <Card title="项目销售流程" extra='（点击可变更流程，注意：完成之后不可修改！）' bodyStyle={{padding: 30}}>
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
              id="page"
              className={styles.main}>
              <Card>
                { params.state === 'true' ? <Tabs defaultActiveKey="4" >
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
                </Tabs> : <Tabs defaultActiveKey="1" >
                  <TabPane tab="详细信息" key="1">
                    <Description data={data}/>
                  </TabPane>
                  <TabPane tab="竞争对手" key="2">
                    <CompetitorList businessId={data.businessId}/>
                  </TabPane>
                  <TabPane tab="报价" key="3">
                    <CompetitorTable businessId={data.businessId}/>
                  </TabPane>
                  <TabPane tab="商机明细" key="4" >
                    <TableDetail value={data.businessId} onSuccess={()=>{}}/>
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
                    <Dynamic value={data}/>
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
