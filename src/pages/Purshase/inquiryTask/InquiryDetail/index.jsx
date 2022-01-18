import {useHistory, useParams} from 'ice';
import React, {useRef} from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Badge, Button, Card, Collapse, Descriptions, Empty, Space, Table} from 'antd';
import {useRequest} from '@/util/Request';
import styles from '@/pages/Crm/customer/CustomerDetail/index.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import {inquiryTaskDetail} from '@/pages/Purshase/inquiryTask/inquiryTaskUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Supply from '@/pages/Purshase/inquiryTask/components/Supply';
import Modal from '@/components/Modal';
import PurchaseQuotationList from '@/pages/Purshase/purchaseQuotation/purchaseQuotationList';

const InquiryDetail = () => {

  const params = useParams();

  const quotationRef = useRef();

  const history = useHistory();


  const {loading, data, refresh} = useRequest(inquiryTaskDetail, {
    defaultParams: {
      data: {
        inquiryTaskId: params.cid
      }
    }
  });
  console.log(data);

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data) {
    return <Empty />;
  }

  const status = (value) => {
    switch (value) {
      case 0:
        return <Badge text="发起" color="yellow" />;
      case 98:
        return <Badge text="执行中" color="blue" />;
      case 99:
        return <Badge text="完成" color="green" />;
      default:
        break;
    }
  };

  return (
    <div className={styles.detail} style={{overflowX: 'hidden'}}>
      <Card title={<Breadcrumb />} extra={<Space>
        <Button onClick={() => {
          history.push('/purchase/inquiryTask');
        }}>返回</Button>
      </Space>} />
      <div className={styles.main}>
        <Card title="基本信息">
          <Descriptions>
            <Descriptions.Item label="任务编码">{data.inquiryTaskCode}</Descriptions.Item>
            <Descriptions.Item label="负责人">{data.user && data.user.name}</Descriptions.Item>
            <Descriptions.Item label="任务状态">{status(data.status)}</Descriptions.Item>
            <Descriptions.Item label="指派人">{data.founder && data.founder.name}</Descriptions.Item>
            <Descriptions.Item label="指派时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="截止报价时间">{data.deadline}</Descriptions.Item>
            <Descriptions.Item label="供应商等级">{data.crmCustomerLevel}</Descriptions.Item>
            <Descriptions.Item label="是否供应商物料">{data.isSupplier ? '是' : '否'}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div
        className={styles.main}>
        <Card title="物料清单">
          <Table dataSource={data.detailResults || []} pagination={false} rowKey="inquiryDetailId">
            <Table.Column title="物料" dataIndex="skuResult" render={(value) => {
              return <SkuResultSkuJsons skuResult={value} />;
            }} />
            <Table.Column title="数量" dataIndex="total" />
            <Table.Column title="备注" dataIndex="remark" />
            <Table.Column width={100} render={(value, record) => {
              return <><Button type="link" onClick={() => {
                quotationRef.current.open({
                  skuId: record.skuId,
                  check: true,
                  source: 'inquiryTask',
                  sourceId: params.cid
                });
              }}>查看当前报价</Button></>;
            }} />
          </Table>
        </Card>
      </div>

      <div
        className={styles.main}>
        <Card title="关联供应商目录">
          <Supply
            onChange={() => {
              refresh();
            }}
            source='inquiryTask'
            level={{label: '', value: data.supplierLevel}}
            supplySku={data.isSupplier}
            data={data.customerResults}
            skus={data.detailResults || []}
            id={params.cid}
          />
        </Card>
      </div>

      <Modal
        width={1600}
        ref={quotationRef}
        component={PurchaseQuotationList}
        onSuccess={() => {
          quotationRef.current.close();
        }} />

    </div>
  );
};

export default InquiryDetail;
