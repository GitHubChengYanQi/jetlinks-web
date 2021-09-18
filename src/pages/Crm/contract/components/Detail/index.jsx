import React, {useRef} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {EditOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import Dynamic from '@/pages/Crm/business/BusinessDetails/compontents/Dynamic';
import CompetitorList from '@/pages/Crm/competitor/components/CompetitorTable';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {useRequest} from '@/util/Request';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import CompetitorTable from '@/pages/Crm/competitorQuote/components/competitorTable';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import styles from './index.module.scss';
import {contractDetail} from '@/pages/Crm/contract/ContractUrl';
import Desc from '@/pages/Crm/contract/components/Desc';

const {TabPane} = Tabs;

const Detail = () => {
  const params = useParams();
  const ref = useRef(null);
  const refTrack = useRef(null);
  const {loading, data, refresh} = useRequest(contractDetail, {
    defaultParams: {
      data: {
        contractId: params.cid
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
              <h3>{data.name}</h3>
              <div>
                <em>创建时间：{data.time}</em>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.titleButton}>

          <Button
            style={params.state === 'false' ? {'display': 'none' }: null }
            onClick={() => {
              refTrack.current.open(false);
            }} icon={<EditOutlined/>}>添加跟进</Button>

          <Modal width={1400} title="跟进"
            ref={refTrack}
            footer={
              <>
                <Button type="primary" onClick={()=>{
                  refTrack.current.formRef.current.tableRef.current.submit();
                }}  >
                  保存
                </Button>
                <Button onClick={()=>{
                  refTrack.current.formRef.current.tableRef.current.submit();
                }}  >
                  取消
                </Button>
              </>}
            component={CrmBusinessTrackEdit} onSuccess={() => {
              refTrack.current.close();
              refresh();
            }} val={data} number={1}/>

          <Button
            style={params.state === 'false' ? {'display': 'none' }: null }
            type="primary" onClick={() => {
              ref.current.open(data.contractId);
            }}>编辑</Button>


          <Modal width={800} title="客户" component={BusinessEdit} onSuccess={() => {
            ref.current.close();
            refresh();
          }} ref={ref}/>
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
              <Card>
                <Desc data={data}/>
              </Card>
            </div>

            <div
              className={styles.main}>

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
                    <Track value={data} number={1} />
                  </TabPane>
                </Tabs>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

    </div>;
  }

  return '暂无合同';


};

export default Detail;
