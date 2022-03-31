import React, {useRef} from 'react';
import {Button, Card, Col, Row, Spin} from 'antd';
import styles from './index.module.less';
import SkuList from '@/pages/Test/MaterialAnalysis/components/SkuList';
import {useRequest} from "@/util/Request";
import Recommended from "@/pages/Test/MaterialAnalysis/components/Recommended";
import OweSku from "@/pages/Test/MaterialAnalysis/components/OweSku";

const MaterialAnalysis = () => {

  const skuRef = useRef();

  const {loading, data, run} = useRequest({
    url: '/mes/analysis',
    method: 'POST',
  }, {
    manual: true
  });


  return <div>
    <Row gutter={24} className={styles.minHeight}>
      <Col span={8} className={styles.leftCol}>
        <div className={styles.skuLayout}>
          <div className={styles.skuList}>
            <SkuList ref={skuRef}/>
          </div>
          <div className={styles.skuBottom}>
            <Button
              loading={loading}
              type='primary'
              onClick={() => {
                const skuList = skuRef.current.skuList;
                console.log(skuList)
                run({
                  data: {
                    skuIds: skuList.map((item) => {
                      return {
                        skuId: item.skuId,
                        num: item.num,
                        fixed: item.fixed,
                      };
                    })
                  }
                });
              }}
            >开始分析</Button>
          </div>
        </div>

      </Col>
      <Col span={16}>
        <div style={{maxHeight: 'calc(100vh - 110px)', overflow: 'auto'}}>
          <Spin spinning={loading} tip='分析中，请稍等...'>
            <Card title='生产推荐' bordered={false}>
              <Recommended data={data && data.result}/>
            </Card>
            <Card title='缺料信息' bordered={false}>
              <OweSku data={data && data.owe}/>
            </Card>
          </Spin>
        </div>
      </Col>
    </Row>

  </div>;
};

export default MaterialAnalysis;
