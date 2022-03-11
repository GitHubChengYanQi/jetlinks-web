import React from 'react';
import {Button, Card, Tabs, Empty, Descriptions} from 'antd';
import {getSearchParams, useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import Breadcrumb from '@/components/Breadcrumb';
import Icon from '@/components/Icon';
import { useRequest} from '@/util/Request';
import styles from './index.module.scss';
import {orderDetail} from '@/pages/Erp/order/OrderUrl';

const {TabPane} = Tabs;

const Detail = ({id, status, ...props}) => {

  const history = useHistory();

  const params = getSearchParams();

  const {loading, data, refresh} = useRequest(orderDetail, {
    defaultParams: {
      data: {
        orderId: params.id || id,
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data) {
    return <Empty />;
  }


  return (
    <div className={styles.detail}>
      <Card>
        <Breadcrumb title="订单详情" />
      </Card>
      <Card>
        <div className={styles.title}>
          订单详情
        </div>
        <div className={styles.titleButton}>
          <Button onClick={() => {
            history.goBack();
          }}><Icon type="icon-huifu" />返回</Button>
        </div>
        }
      </Card>
      <div
        className={styles.main}>
        <Card>
          <Descriptions title="基本信息">
            <Descriptions.Item label="法定代表人"></Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
      <div
        className={styles.main}>
        <Card>
          <Tabs defaultActiveKey="9">
            <TabPane tab="物料清单" key="9">

            </TabPane>
          </Tabs>
        </Card>
      </div>

    </div>

  );
};

export default Detail;
