import React, {useRef} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {EditOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {useRequest} from '@/util/Request';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './index.module.scss';
import {contractDetail} from '@/pages/Crm/contract/ContractUrl';
import Desc from '@/pages/Crm/contract/components/Desc';
import parse from 'html-react-parser';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';
import TableDetail from '@/pages/Crm/contract/ContractEdit/components/TableDetail';

const {TabPane} = Tabs;

const Detail = () => {
  const params = useParams();
  const ref = useRef(null);
  const refTrack = useRef(null);

  const submitRef = useRef(null);

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
                <em>创建时间：{data.time}</em>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.titleButton}>

          <Button
            style={params.state === 'false' ? {'display': 'none'} : null}
            onClick={() => {
              refTrack.current.open(false);
            }} icon={<EditOutlined />}>添加跟进</Button>

          <Modal
            width={1400}
            title="跟进"
            compoentRef={submitRef}
            ref={refTrack}
            footer={
              <>
                <Button type="primary" onClick={() => {
                  submitRef.current.formRef.current.submit();
                }}>
                  保存
                </Button>
                <Button onClick={() => {
                  submitRef.current.formRef.current.submit();
                }}>
                  取消
                </Button>
              </>}
            component={CrmBusinessTrackEdit}
            onSuccess={() => {
              refTrack.current.close();
              refresh();
            }}
            val={data.partyA}
            number={2} />

          <Button
            style={params.state === 'false' ? {'display': 'none'} : null}
            type="primary"
            onClick={() => {
              ref.current.open(data);
            }}>编辑</Button>


          <Modal width={800} title="客户" component={AddContractEdit} onSuccess={() => {
            ref.current.close();
            refresh();
          }} ref={ref} />
          <Button
            // style={params.state === 'false' ? {'display': 'none' }: null }
            onClick={() => {
              history.back();
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
              <Card>
                <Desc data={data} />
              </Card>
            </div>

            <div
              className={styles.main}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="合同内容" key="1">
                    {parse(data.content)}
                  </TabPane>
                  <TabPane tab="产品明细" key="2">
                    <TableDetail value={data.contractId} />
                  </TabPane>
                </Tabs>
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.main} style={{height: '100%'}}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="跟进" key="1">
                    <Track value={data.contractId} number={2} />
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
