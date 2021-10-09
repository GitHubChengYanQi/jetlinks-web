import React, {useRef, useState} from 'react';
import { Button, Card, Col, Row, Tabs, Statistic, Divider} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {customerDelete, customerDetail, customerEdit} from '@/pages/Crm/customer/CustomerUrl';
import {useHistory, useParams} from 'ice';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import Description from '@/pages/Crm/customer/CustomerDetail/compontents/Description';
import Desc from '@/pages/Crm/customer/CustomerDetail/compontents/Desc';
import AdressList from '@/pages/Crm/customer/CustomerEdit/components/AdressList';
import Dynamic from '@/pages/Crm/customer/CustomerDetail/compontents/Dynamic';
import OrderList from '@/pages/Erp/order/OrderList';
import ContractTable from '@/pages/Crm/contract/components/components/ContractTable';
import Upload from '@/pages/Crm/customer/CustomerDetail/compontents/Upload';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import {EditOutlined} from '@ant-design/icons';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import Modal from '@/components/Modal';
import ContactsTable from '@/pages/Crm/contacts/ContactsList';
import {EditName} from '@/pages/Crm/customer/components/Edit/indexName';
import InputEdit from '@/pages/Crm/customer/components/Edit/InputEdit';
import TreeEdit from '@/pages/Crm/customer/components/Edit/TreeEdit';
import AvatarEdit from '@/pages/Crm/customer/components/Edit/AvatarEdit';
import BusinessAdd from '@/pages/Crm/business/BusinessAdd';
import CustomerMenu from '@/pages/Crm/customer/CustomerDetail/compontents/CustomerMenu';
import styles from './index.module.scss';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();

  const [responsive, setResponsive] = useState(false);

  const ref = useRef(null);
  const addRef = useRef(null);
  const refTrack = useRef(null);
  const submitRef = useRef(null);
  const history = useHistory();

  const {loading, data, run, refresh} = useRequest(customerDetail, {
    defaultParams: {
      data: {
        customerId: params.cid
      }
    }
  });

  const {run: runCustomer} = useRequest(customerEdit, {manual: true});

  const [width,setWidth] = useState();

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data) {
    return '暂无客户';
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
              <AvatarEdit
                data={data}
                name={data.customerName && data.customerName.substring(0, 1)}
                onChange={async (value) => {
                  await runCustomer({
                    data: {
                      customerId: data.customerId,
                      avatar: value
                    }
                  });
                }} value={data.avatar} />
            </Col>
            <Col>
              <EditName value={data && data.customerName || '未填写'} onChange={async (value) => {
                await runCustomer({
                  data: {
                    customerId: data.customerId,
                    customerName: value
                  }
                });
              }} />
              <div>
                <em>公司地址：
                  <InputEdit value={data && data.signIn} onChange={async (value) => {
                    await runCustomer({
                      data: {
                        customerId: data.customerId,
                        signIn: value
                      }
                    });
                  }}
                  />
                  &nbsp;&nbsp;/&nbsp;&nbsp;
                  行业：
                  <TreeEdit
                    values={data && data.industryId}
                    val={data.crmIndustryResult && data.crmIndustryResult.industryName}
                    onChange={async (value) => {
                      await runCustomer({
                        data: {
                          customerId: data.customerId,
                          industryId: value
                        }
                      });
                    }}
                  />
                </em>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.titleButton}>
          <CustomerMenu data={data} api={customerDelete} url='/CRM/customer' edit />
          <Button
            style={params.state === 'false' ? {'display': 'none'} : null}
            onClick={() => {
              addRef.current.open(false);
            }} icon={<EditOutlined />}>创建商机</Button>
          <BusinessAdd
            ref={addRef}
            customerId={data.customerId}
            userId={data.userId}
            onClose={() => {
              addRef.current.close();
              refTrack.current.close();
              refresh();
            }}
          />
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
            onWidthChange={(value) => {
              setWidth(value);
            }}
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
            }} val={data.customerId} number={0} />
          <Button onClick={() => {
            history.push("/CRM/customer");
          }}><Icon type="icon-huifu" />返回</Button>
        </div>
      </Card>
      <div
        className={styles.main}>
        <Card>
          <Desc data={data} />
        </Card>
      </div>
      {/* <div */}
      {/*  className={styles.main}> */}
      {/*  <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}> */}
      {/*    <ProCard> */}
      {/*      <Statistic title="今日UV" value={79.0} precision={2} /> */}
      {/*    </ProCard> */}
      {/*    <Divider type={responsive ? 'horizontal' : 'vertical'} /> */}
      {/*    <ProCard> */}
      {/*      <Statistic title="冻结金额" value={112893.0} precision={2} /> */}
      {/*    </ProCard> */}
      {/*    <Divider type={responsive ? 'horizontal' : 'vertical'} /> */}
      {/*    <ProCard> */}
      {/*      <Statistic title="信息完整度" value={93} suffix="/ 100" /> */}
      {/*    </ProCard> */}
      {/*    <Divider type={responsive ? 'horizontal' : 'vertical'} /> */}
      {/*    <ProCard> */}
      {/*      <Statistic title="冻结金额" value={112893.0} /> */}
      {/*    </ProCard> */}
      {/*  </ProCard.Group> */}
      {/* </div> */}
      <div
        className={styles.main}>
        <Row gutter={12}>
          <Col span={16}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="详细信息" key="1">
                  <Description data={data} />
                </TabPane>
                <TabPane tab="联系人" key="2">
                  <ContactsTable customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="地址" key="3">
                  <AdressList customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="合同" key="4">
                  <ContractTable customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="货单" key="5">
                  <OrderList customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="回款" key="6">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="附件" key="7">
                  <Upload customerId={data && data.customerId} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="跟进" key="1">
                  <Track value={null} number={null} trackMessageId={data.customerId} />
                </TabPane>
                <TabPane tab="动态" key="2">
                  <Dynamic value={data} api={{
                    url: '/customerDynamic/list', method: 'POST'
                  }} />
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
