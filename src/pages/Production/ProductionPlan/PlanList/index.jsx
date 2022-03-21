import React from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, Card, List, Space} from 'antd';
import {useHistory} from 'ice';
import {useRequest} from '@/util/Request';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Breadcrumb from '@/components/Breadcrumb';
import Label from '@/components/Label';
import styles from './index.module.less';

const PlanList = () => {

  const history = useHistory();

  const {loading, data} = useRequest({url: '/productionPlan/list', method: 'POST'});

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  return <>
    <Card title={<Breadcrumb />}>
      <div className="div_center">
        <List
          bordered={false}
          dataSource={data || []}
          renderItem={(planItem) => (
            <div style={{margin: '16px 0'}}>
              <Card
                type="inner"
                title={<Space size={24}>
                  <div><Label>计划编号：</Label> {planItem.coding}</div>
                  <div><Label>主题：</Label>{planItem.theme}</div>
                  <div><Label>负责人：</Label> {planItem.userResult && planItem.userResult.name}</div>
                </Space>}
                bodyStyle={{padding: 0}}
                extra={<Space size={24}>
                  <div>
                    <Label>创建时间：</Label>{planItem.createTime}
                  </div>
                  <div>
                    <Label>执行时间：</Label>{planItem.executionTime}
                  </div>
                </Space>}
              >
                <List
                  bordered={false}
                  dataSource={[1]}
                  renderItem={() => {
                    return (
                      <div className={styles.parent}>
                        <div className={styles.leftDiv}>
                          {
                            planItem.planDetailResults.map((rowItem, index) => {
                              const skuResult = rowItem.skuResult || {};
                              return <div key={index} style={{padding: 24, borderBottom: 'solid #eee 1px'}}>
                                <Space size={24}>
                                  <Space direction="vertical">
                                    <div>
                                      <Label>物料编码：</Label>{skuResult && skuResult.standard}
                                    </div>
                                    <Button type="link" style={{padding: 0}}>
                                      <SkuResultSkuJsons skuResult={skuResult} />
                                    </Button>
                                  </Space>
                                  <div>
                                    × {rowItem.planNumber}
                                  </div>
                                </Space>
                                <div style={{float: 'right', lineHeight: '62px'}}>
                                  <Label>物料描述：</Label><SkuResultSkuJsons describe skuResult={skuResult} />
                                </div>
                              </div>;
                            })
                          }</div>
                        <div className={styles.rightDiv} onClick={()=>{
                          history.push(`/production/productionPlan/detail?id=${planItem.productionPlanId}`);
                        }}>详情</div>
                      </div>
                    );
                  }} />
              </Card>
            </div>
          )}
        />
      </div>
    </Card>
  </>;
};

export default PlanList;
