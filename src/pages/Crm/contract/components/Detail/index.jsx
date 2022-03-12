import React from 'react';
import {Button, Card, Tabs} from 'antd';
import {useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import parse from 'html-react-parser';
import {useRequest} from '@/util/Request';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './index.module.scss';
import {contractDetail} from '@/pages/Crm/contract/ContractUrl';
import Desc from '@/pages/Crm/contract/components/Desc';
import OrderDetailTable from '@/pages/Crm/contract/components/OrderDetailTable';
import Empty from '@/components/Empty';
import PayTable from '@/pages/Crm/contract/components/PayTable';
import {orderDetail} from '@/pages/Erp/order/OrderUrl';

const {TabPane} = Tabs;

const Detail = ({id, noContent}) => {
  const params = useParams();

  const {loading: orderLoading, data: orderData, run: orderRun} = useRequest(orderDetail, {manual: true});

  const {loading, data} = useRequest(contractDetail, {
    defaultParams: {
      data: {
        contractId: params.cid || id
      }
    },
    onSuccess: (res) => {
      switch (res.source) {
        case '销售':
        case '采购':
          if (res.sourceId) {
            orderRun({
              data: {
                orderId: res.sourceId
              }
            });
          }
          break;
        default:
          break;
      }
    }
  });

  if (loading || orderLoading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data || !orderData) {
    return <Empty />;
  }

  return <div className={styles.detail}>
    <Card title={<Breadcrumb />} bodyStyle={{padding: 0}} />
    <div className={styles.main}>
      <Card title="合同信息" extra={<Button
        onClick={() => {
          history.back();
        }}><Icon type="icon-back" />返回</Button>}>
        <Desc data={data} />
      </Card>
    </div>

    <div
      className={styles.main}>
      <Card>
        <Tabs defaultActiveKey="1">
          {!noContent && <TabPane tab="合同内容" key="1">
            {
              parse(data.content)
            }
          </TabPane>}
          <TabPane tab="产品明细" key="2">
            <OrderDetailTable orderId={data.sourceId} />
          </TabPane>;
          <TabPane tab="付款信息" key="3">
            <PayTable payment={orderData.paymentResult} />
          </TabPane>;
        </Tabs>
      </Card>
    </div>

  </div>;

};

export default Detail;
