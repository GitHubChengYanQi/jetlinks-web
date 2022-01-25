import {useHistory, useParams} from 'ice';
import React, {useRef} from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Badge, Button, Card, Descriptions, Empty, Space} from 'antd';
import {useRequest} from '@/util/Request';
import styles from '@/pages/Crm/customer/CustomerDetail/index.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import Supply from '@/pages/Purshase/inquiryTask/components/Supply';
import {procurementPlanDetail} from '@/pages/Purshase/procurementPlan/procurementPlanUrl';
import CreatePurchaseOrder from '@/pages/Purshase/procurementPlan/components/CreatePurchaseOrder';

const PlanDetail = () => {

  const params = useParams();

  const history = useHistory();


  const {loading, data, refresh} = useRequest(procurementPlanDetail, {
    defaultParams: {
      data: {
        procurementPlanId: params.cid
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data) {
    return <Empty />;
  }

  const status = (value) => {
    switch (value) {
      case 0:
      case 98:
        return <Badge text="进行中" color="blue" />;
      case 97:
        return <Badge text="已拒绝" color="red" />;
      case 99:
        return <Badge text="已完成" color="green" />;
      default:
        break;
    }
  };

  return (
    <div className={styles.detail} style={{overflowX: 'hidden'}}>
      <Card title={<Breadcrumb />} extra={<Space>
        <Button onClick={() => {
          history.push('/purchase/procurementPlan');
        }}>返回</Button>
      </Space>} />
      <div className={styles.main}>
        <Card title="基本信息">
          <Descriptions>
            <Descriptions.Item label="采购计划名称">{data.procurementPlanName}</Descriptions.Item>
            <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="备注">{data.remark || '无'}</Descriptions.Item>
            <Descriptions.Item label="状态">{status(data.status)}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div
        className={styles.main}>
        <Card title="物料清单" bodyStyle={{padding: 0}}>
          <CreatePurchaseOrder
            data={data.detalResults || []}
            palnId={params.cid}
            onChange={() => {
              refresh();
            }}
          />
        </Card>
      </div>

      <div
        className={styles.main}>
        <Card title="关联供应商目录">
          <Supply
            onChange={() => {
              refresh();
            }}
            source="purchasePlan"
            data={data.customerResults}
            skus={data.detalResults || []}
            id={params.cid}
          />
        </Card>
      </div>

    </div>
  );
};

export default PlanDetail;
