import React from 'react';
import {Button, Card, List, Space} from 'antd';
import Label from '@/components/Label';
import styles from '@/pages/Production/ProductionPlan/PlanList/index.module.less';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const ShipList = ({data}) => {

  return <>
    <List
      bordered={false}
      dataSource={data || [1, 2]}
      renderItem={(planItem) => (
        <div style={{margin: '16px 0'}}>
          <Card
            headStyle={{border: 'none'}}
            type="inner"
            title={<Space size={24}>
              <div><Label>工序名称：</Label> {planItem.coding}</div>
              <div><Label>工位：</Label>{planItem.theme}</div>
            </Space>}
            bodyStyle={{padding: 0}}
          >
            <List
              bordered={false}
              dataSource={[1]}
              renderItem={() => {
                return [1, 2] && (
                  <div className={styles.parent}>
                    <div className={styles.leftDiv}>
                      {
                        [1, 2].map((rowItem, index) => {
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
                    <div className={styles.rightDiv} onClick={() => {
                      history.push(`/production/productionPlan/detail?id=${planItem.productionPlanId}`);
                    }}>
                      分派任务
                    </div>
                  </div>
                );
              }} />
          </Card>
        </div>
      )}
    />
  </>;
};

export default ShipList;
