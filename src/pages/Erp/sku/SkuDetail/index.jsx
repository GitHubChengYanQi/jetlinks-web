import React from 'react';
import {useHistory, useParams} from 'ice';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, Card, Col, Descriptions, Empty, Row, Space, Tabs} from 'antd';
import styles from '@/pages/Crm/customer/CustomerDetail/index.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';

const {TabPane} = Tabs;

const SkuDetail = () => {

  const params = useParams();

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
      <Card>
        <Breadcrumb />
      </Card>
      <Card>
        <div className={styles.title}>
          <Descriptions title="基础数据">
            <Descriptions.Item label="型号">{data.skuName}</Descriptions.Item>
            <Descriptions.Item label="名称">{data.spuResult && data.spuResult.name}</Descriptions.Item>
            <Descriptions.Item label="配置">
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
                      {data.list.map((items, index) => {
                        return `${items.itemAttributeResult.attribute} ： ${items.attributeValues}`;
                      }).toString()}
                    </em>
                    :
                    '无'
                }
                )
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="编码">{data.standard}</Descriptions.Item>
            <Descriptions.Item label="分类">{data.spuClassification && data.spuClassification.name}</Descriptions.Item>
            <Descriptions.Item label="单位">{data.unit ? data.unit.unitName : '无'}</Descriptions.Item>
            <Descriptions.Item label="备注">{data.remarks || '无'}</Descriptions.Item>
            <Descriptions.Item label="创建人">{data.createUserName || '无'}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
      <Card>
        <Descriptions title="默认数据" column={4}>
          <Descriptions.Item label="质检方案">{data.qualityPlan ? data.qualityPlan.planName : '无'}</Descriptions.Item>
          <Descriptions.Item label="批量">{data.batch ? '是' : '否'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <div
        className={styles.main}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="tab1" key="1">
              tab1
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

    </div>

  );
};

export default SkuDetail;
