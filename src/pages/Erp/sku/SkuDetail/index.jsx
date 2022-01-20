import React, {useRef} from 'react';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, Card, Col, Descriptions, Empty, Row, Space, Tabs} from 'antd';
import {useRequest} from '@/util/Request';
import styles from '@/pages/Crm/customer/CustomerDetail/index.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import Modal from '@/components/Modal';
import Quote from '@/pages/Purshase/Quote';
import PurchaseQuotationList from '@/pages/Purshase/purchaseQuotation/purchaseQuotationList';

const {TabPane} = Tabs;

const SkuDetail = () => {

  const params = useParams();

  const quoteRef = useRef();

  const addQuoteRef = useRef();

  const history = useHistory();

  const {loading, data, refresh} = useRequest(skuDetail, {
    defaultParams: {
      data: {
        skuId: params.cid
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
      <Card title={<Breadcrumb />} extra={<Space>
        <Button onClick={() => {
          quoteRef.current.open(
            {
              skuId: data.skuId,
              sourceId: data.skuId,
              source: 'sku'
            }
          );
        }}>添加报价</Button>
        <Button onClick={() => {
          history.push('/SPU/sku');
        }}>返回</Button>
      </Space>} />
      <Card title="基础数据">
        <div className={styles.title}>
          <Descriptions>
            <Descriptions.Item label="成品码">{data.standard}</Descriptions.Item>
            <Descriptions.Item label="分类">{data.spuClass && data.spuClass.name}</Descriptions.Item>
            <Descriptions.Item
              label="产品">
              {data.spuResult && data.spuResult.spuClassificationResult && data.spuResult.spuClassificationResult.name}
            </Descriptions.Item>
            <Descriptions.Item label="型号">{data.spuResult && data.spuResult.name}</Descriptions.Item>
            <Descriptions.Item label="参数组合">
              <Space>
                (
                {
                  data.list
                  &&
                  data.list.length > 0
                  &&
                  data.list[0].attributeValues
                    ?
                    <em>
                      {data.list.map((items) => {
                        return `${items.itemAttributeResult.attribute} ： ${items.attributeValues}`;
                      }).toString()}
                    </em>
                    :
                    '无'
                }
                )
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="单位">{data.unit ? data.unit.unitName : '无'}</Descriptions.Item>
            <Descriptions.Item label="批量">{data.batch ? '是' : '否'}</Descriptions.Item>
            <Descriptions.Item label="备注">{data.remarks || '无'}</Descriptions.Item>
            <Descriptions.Item label="创建人">{data.createUserName || '无'}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
      <Card title="默认数据">
        <Descriptions column={4}>
          <Descriptions.Item label="质检方案">{data.qualityPlan ? data.qualityPlan.planName : '无'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <div
        className={styles.main}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="报价信息" key="1">
              <PurchaseQuotationList value={{skuId: data.skuId, check: true}} />
            </TabPane>
            <TabPane tab="tab2" key="2">
              tab2
            </TabPane>
            <TabPane tab="tab3" key="3">
              tab3
            </TabPane>
            <TabPane tab="tab4" key="4">
              tab4
            </TabPane>
          </Tabs>
        </Card>
      </div>


      <Modal
        headTitle="添加报价信息"
        width={2000}
        compoentRef={addQuoteRef}
        footer={<Button
          type="primary"
          style={{marginTop: 8}}
          onClick={() => {
            addQuoteRef.current.submit();
          }}>添加报价</Button>}
        ref={quoteRef}
        component={Quote}
        onSuccess={() => {
          quoteRef.current.close();
        }} />

    </div>

  );
};

export default SkuDetail;
