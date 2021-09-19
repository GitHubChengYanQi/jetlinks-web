import React, {useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Row, Tabs, Statistic, Divider} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';
import {useParams} from 'ice';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import Description from '@/pages/Crm/customer/CustomerDetail/compontents/Description';
import Desc from '@/pages/Crm/customer/CustomerDetail/compontents/Desc';
import ContactsList from '@/pages/Crm/customer/CustomerEdit/components/ContactsList';
import AdressList from '@/pages/Crm/customer/CustomerEdit/components/AdressList';
import Modal2 from '@/components/Modal';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import Dynamic from '@/pages/Crm/customer/CustomerDetail/compontents/Dynamic';
import OrderList from '@/pages/Erp/order/OrderList';
import ContractTable from '@/pages/Crm/contract/components/components/ContractTable';
import styles from './index.module.scss';
import Upload from '@/pages/Crm/customer/CustomerDetail/compontents/Upload';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import Track from '@/pages/Crm/business/BusinessDetails/compontents/Track';
import {EditOutlined} from '@ant-design/icons';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import Modal from '@/components/Modal';

const {TabPane} = Tabs;

const CustomerDetail = () => {
  const params = useParams();

  const [responsive, setResponsive] = useState(false);

  const ref = useRef(null);
  const refTrack = useRef(null);
  const submitRef = useRef(null);

  const {loading, data, run,refresh} = useRequest(customerDetail, {
    defaultParams: {
      data: {
        customerId: params.cid
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data){
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
              <Avatar size={64}>LOGO</Avatar>
            </Col>
            <Col>
              <h3>{data && data.customerName || '未填写'}</h3>
              <div>
                <em>注册地址：{data && data.signIn || '未填写'}&nbsp;&nbsp;/&nbsp;&nbsp;行业：{data && data.crmIndustryResult ? data.crmIndustryResult.industryName : '未填写'}</em>
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
            }} val={data} number={0}/>
          <Button type="primary" onClick={() => {
            ref.current.open(data && data.customerId);
          }}>编辑</Button>
          <CreateNewCustomer title="客户" model={CustomerEdit} widths={1200} onSuccess={() => {
            ref.current.close();
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
        <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} precision={2} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="信息完整度" value={93} suffix="/ 100" />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} />
          </ProCard>
        </ProCard.Group>
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
                <TabPane tab="联系人" key="2">
                  <ContactsList customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="地址" key="3">
                  <AdressList customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="合同" key="4">
                  <ContractTable customerId={data && data.customerId} />
                </TabPane>
                <TabPane tab="订单" key="5">
                  <OrderList customerId={data &&data.customerId} />
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
                <TabPane tab="动态" key="1">
                  <Dynamic value={data} />
                </TabPane>
                <TabPane tab="跟进" key="2">
                  <Track value={null} number={null} trackMessageId={data.customerId}/>
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
