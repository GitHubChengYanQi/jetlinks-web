/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React from 'react';
import {Button, Card, Descriptions} from 'antd';
import {useHistory, useParams} from 'ice';
import {useRequest} from '@/util/Request';
import { ScanOutlined} from '@ant-design/icons';
import { spuDetail} from '@/pages/Erp/spu/spuUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import ProCard from '@ant-design/pro-card';
import Code from '@/pages/Erp/spu/components/Code';


const PartsList = () => {

  const params = useParams();

  const history = useHistory();

  const {loading, data} = useRequest(spuDetail, {
    manual: !params.cid,
    defaultParams: {
      data: {
        spuId: params.cid
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }


  const Type = () => {
    switch (data.productionType) {
      case 0:
        return '自制件';
      case 1:
        return '委派件';
      case 2:
        return '外购件';
      default:
        break;
    }
  };


  return (
    <>
      <Card title="产品详情" extra={<Button onClick={() => {
        history.goBack();
      }}>返回</Button>}>
        <div style={{maxWidth: 1220, margin: 'auto'}}>
          <ProCard className="h2Card" title="详细信息" headerBordered>
            <Descriptions column={1} bordered labelStyle={{width: 170, textAlign: 'right', backgroundColor: '#fff'}}>
              <Descriptions.Item label={<ScanOutlined />}>
                <Code source="spu" id={data.spuId} />
              </Descriptions.Item>
              <Descriptions.Item label="产品名称">
                {data.name}
              </Descriptions.Item>
              <Descriptions.Item label="类目">{data.category ? data.category.categoryName : '--'}</Descriptions.Item>
              <Descriptions.Item label="分类"> {data.spuClassificationResult ? data.spuClassificationResult.name : '--'}</Descriptions.Item>
              <Descriptions.Item label="单位"> {data.unitResult ? data.unitResult.unitName : '--'}</Descriptions.Item>
              <Descriptions.Item label="养护周期"> {data.curingCycle ? `${data.curingCycle}天` : '--'}</Descriptions.Item>
              <Descriptions.Item label="生产类型">{Type()}</Descriptions.Item>
              <Descriptions.Item label="重要程度" width={120}>{data.important || '--'}</Descriptions.Item>
              <Descriptions.Item label="产品重量" width={120}>{data.weight || '--'}</Descriptions.Item>
              <Descriptions.Item label="材质" width={150}>{data.material ? data.material.name : '--'}</Descriptions.Item>
              <Descriptions.Item label="成本">{data.cost || '--'}</Descriptions.Item>
              <Descriptions.Item label="易损">{data.vulnerability === 0 ? '易损' : '不易损'}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            </Descriptions>
          </ProCard>
        </div>
      </Card>
    </>
  );
};

export default PartsList;
