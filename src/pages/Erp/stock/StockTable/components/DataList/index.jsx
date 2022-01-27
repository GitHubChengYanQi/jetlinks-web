import React from 'react';
import {Button, Card, Descriptions, Empty, List, Progress, Space, Statistic} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';


const DataList = ({
  data,
  loading,
  type,
}) => {

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  const count = (array) => {
    let number = 0;
    array.map((item) => {
      return number += item.number;
    });
    return number;
  };

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const titleType = (item = {}) => {
    switch (type) {
      case 'sku':
        return {
          countTitle: '物料种类',
          cardTitle: '物料列表',
          nameTitle: '物料名称',
          name: <SkuResultSkuJsons skuResult={item.skuResult} />,
        };
      case 'className':
        return {
          countTitle: '产品种类',
          cardTitle: '产品列表',
          nameTitle: '产品名称',
          name: item.className,
        };
      case 'spu':
        return {
          countTitle: '型号种类',
          cardTitle: '型号列表',
          nameTitle: '型号名称',
          name: item.spuName,
        };
      default:
        return {};
    }
  };

  return <>
    <Card title="统计数值" bordered={false}>
      <Space style={{padding: 16}}>
        <Progress
          type="circle"
          percent={100}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          format={() =>
            <Statistic title={titleType().countTitle} value={data.length} />
          } />
        <Progress
          type="circle"
          percent={100}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          format={() =>
            <Statistic title="总数量" value={count(data)} />
          } />
      </Space>
    </Card>
    <Card title={titleType().cardTitle} bordered={false}>
      <List
        size="large"
        bordered={false}
        dataSource={data || []}
        renderItem={item => <List.Item
          extra={<Button type="link">查看</Button>}
        >
          <Descriptions column={2} >
            <Descriptions.Item label={titleType().nameTitle}><strong>{titleType(item).name}</strong></Descriptions.Item>
            <Descriptions.Item label="库存数量"><strong>{item.number}</strong></Descriptions.Item>
          </Descriptions>
        </List.Item>}
      />
    </Card>
  </>;
};

export default DataList;
