import React, {useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Descriptions, Input, InputNumber, Row, Tabs} from 'antd';
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
import DatePicker from '@/components/DatePicker';
import Choose from '@/pages/Crm/contract/components/Choose';

const {TabPane} = Tabs;

const Detail = () => {
  const params = useParams();
  const ref = useRef(null);
  const refTrack = useRef(null);

  const [width, setWidth] = useState();

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
              <Avatar size={64}>{data.name.substring(0, 1)}</Avatar>
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
            width={width === 1 ? 1400 : 800}
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
            onWidthChange={(value) => {
              setWidth(value);
            }}
            onSuccess={() => {
              refTrack.current.close();
              refresh();
            }}
            val={data.partyA}
            id={data.contractId}
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
              <Card title="合同信息">
                <Desc data={data} />
              </Card>
            </div>

            <div
              className={styles.main}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="合同内容" key="1">
                    {
                      parse(data.content, {
                        replace: domNode => {
                          if (domNode.name === 'input' && domNode.attribs && domNode.attribs.placeholder)
                            switch (domNode.attribs.class) {
                              case 'inp':
                              case 'number':
                              case 'date':
                              case 'customer':
                                return <>{domNode.attribs.placeholder}</>;
                              default:
                                break;
                            }
                        }
                      })
                    }
                  </TabPane>
                  <TabPane tab="付款信息" key="2">
                    {data.payment && data.payment.details.map((items, index) => {
                      return <Descriptions
                        labelStyle={{width: 100}}
                        contentStyle={{width: 200}}
                        key={index}
                        column={5}
                        bordered>
                        <Descriptions.Item key={index}>
                          {`第${index + 1}批`}
                        </Descriptions.Item>
                        <Descriptions.Item key={index} label="名称">
                          {items.name}
                        </Descriptions.Item>
                        <Descriptions.Item key={index} label="金额">
                          {items.money}
                        </Descriptions.Item>
                        <Descriptions.Item key={index} label="百分比">
                          {items.percent}
                        </Descriptions.Item>
                        <Descriptions.Item key={index} label="时间">
                          {items.time}
                        </Descriptions.Item>
                      </Descriptions>;
                    })}
                  </TabPane>;
                  <TabPane tab="产品明细" key="3">
                    <TableDetail value={data.contractId} />
                  </TabPane>;
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
          </Col>;
        </Row>
      </div>

    </div>;
  }
  return '暂无合同';

};

export default Detail;
