import React, {useRef} from 'react';
import {Button, Card, List, Space} from 'antd';
import Label from '@/components/Label';
import styles from '@/pages/Production/ProductionPlan/PlanList/index.module.less';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Empty from '@/components/Empty';
import Drawer from '@/components/Drawer';
import SopDetailList from '@/pages/ReSearch/sop/sopDetail/sopDetailList';

const ShipList = ({data}) => {

  const ref = useRef();

  if (!Array.isArray(data) || data.length === 0) {
    return <Empty />;
  }

  return <>
    <List
      bordered={false}
      dataSource={data || []}
      renderItem={(item) => {
        const setpSetResult = item.setpSetResult || {};
        const shipSetpResult = setpSetResult.shipSetpResult || {};
        const productionStation = setpSetResult.productionStation || {};
        const sopResult = shipSetpResult.sopResult || {};
        const setpSetDetails = setpSetResult.setpSetDetails || [];

        return <div style={{margin: '16px 0'}}>
          <Card
            headStyle={{border: 'none'}}
            type="inner"
            title={<Space size={24}>
              <div><Label>工序名称：</Label> {shipSetpResult.shipSetpName}</div>
              <div><Label>工位：</Label>{productionStation.name}</div>
            </Space>}
            bodyStyle={{padding: 0}}
            extra={<Space size={24}>
              <div>
                <Label>作业指导：</Label>
                <Button type="link" style={{padding:0}} disabled={!sopResult.sopId} onClick={() => {
                  ref.current.open(sopResult.sopId);
                }}>
                  {sopResult.name || '无'}
                </Button>

              </div>
              <div>
                <Label>使用工具：</Label>
                {shipSetpResult.binds.map((item, index) => {
                  return item.toolResult.name;
                }).join(' | ')}
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
                        setpSetDetails.map((rowItem, index) => {
                          const skuResult = rowItem.skuResult || {};
                          return <div key={index} className={styles.content}>
                            <div className={styles.sku}>
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
                                  × {rowItem.num}
                                </div>
                              </Space>
                            </div>
                            <div className={styles.describe}>
                              <Label>物料描述：</Label><SkuResultSkuJsons describe skuResult={skuResult} />
                            </div>
                            <div className={styles.check}>
                              <Space direction="vertical">
                                <div>
                                  <Label>自检方案：</Label>无
                                </div>
                                <div>
                                  <Label>质检方案：</Label>无
                                </div>
                              </Space>
                            </div>

                          </div>;
                        })
                      }</div>
                    <div className={styles.rightDiv} onClick={() => {

                    }}>
                      分派任务
                    </div>
                  </div>
                );
              }} />
          </Card>
        </div>;
      }}
    />

    <Drawer ref={ref} onSuccess={() => {
      ref.current.close();
    }} headTitle="作业指导" component={SopDetailList} />
  </>;
};

export default ShipList;
