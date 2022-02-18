import React, {useRef} from 'react';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, Card, Descriptions, Empty, Space, Tabs} from 'antd';
import {useRequest} from '@/util/Request';
import styles from '@/pages/Crm/customer/CustomerDetail/index.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import Modal from '@/components/Modal';
import Quote from '@/pages/Purshase/Quote';
import PurchaseQuotationList from '@/pages/Purshase/purchaseQuotation/purchaseQuotationList';

const {TabPane} = Tabs;

const SkuDetail = ({value}) => {

  const params = useParams();

  const quoteRef = useRef();

  const addQuoteRef = useRef();

  const history = useHistory();

  const {loading, data, refresh} = useRequest(skuDetail, {
    defaultParams: {
      data: {
        skuId: value || params.cid
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
      <Card title={!value && <Breadcrumb />} bodyStyle={{padding: 0}} bordered={false}>
        <Card
          title="物料详情"
          headStyle={{border: 'none'}}
          style={{padding: 0}}
          bordered={false}
          bodyStyle={{padding: 0}}
          extra={!value && <Space>
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
      </Card>
      <Card title="基本信息">
        <div className={styles.title}>
          <Descriptions>
            <Descriptions.Item label="物料编码">{data.standard}</Descriptions.Item>
            <Descriptions.Item label="物料分类">{data.skuClass && data.skuClass.name}</Descriptions.Item>
            <Descriptions.Item
              label="名称">
              {data.spuResult && data.spuResult.spuClassificationResult && data.spuResult.spuClassificationResult.name}
            </Descriptions.Item>
            <Descriptions.Item label="型号">{data.spuResult && data.spuResult.name}</Descriptions.Item>
            <Descriptions.Item label="物料描述">
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
            <Descriptions.Item label="规格">{data.specifications || '无'}</Descriptions.Item>
            <Descriptions.Item label="单位">{data.unit ? data.unit.unitName : '无'}</Descriptions.Item>
            <Descriptions.Item label="批量">{data.batch ? '是' : '否'}</Descriptions.Item>
            <Descriptions.Item label="备注">{data.remarks || '无'}</Descriptions.Item>
            <Descriptions.Item label="质检方案">{data.qualityPlan ? data.qualityPlan.planName : '无'}</Descriptions.Item>
            <Descriptions.Item label="创建人">{data.createUserName || '无'}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
      <Card title="物料描述">
        <Space direction="vertical">
          <div>
            图片：
          </div>
          <div>
            图纸：
          </div>
          <div>
            附件：
          </div>
        </Space>
      </Card>
      {!value && <div
        className={styles.main}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="报价信息" key="1">
              <PurchaseQuotationList value={{skuId: data.skuId, check: true}} />
            </TabPane>
            <TabPane tab="操作日志" key="2">

            </TabPane>
            <TabPane tab="tab2" key="3">
              tab2
            </TabPane>
            <TabPane tab="tab3" key="4">
              tab3
            </TabPane>
            <TabPane tab="tab4" key="5">
              tab4
            </TabPane>
          </Tabs>
        </Card>
      </div>}


      <Modal
        headTitle="添加报价信息"
        width={2228}
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
          refresh();
          quoteRef.current.close();
        }} />

    </div>

  );
};

export default SkuDetail;
