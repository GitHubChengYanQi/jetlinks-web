import React, {useEffect, useRef} from 'react';
import {Button, List, Space, Spin, Tag} from 'antd';
import Drawer from '@/components/Drawer';
import SopDetailList from '@/pages/ReSearch/sop/sopDetail/sopDetailList';
import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import Empty from '@/components/Empty';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';


export const Tool = (props) => {
  const {value} = props;
  if (!Array.isArray(value)) {
    return <>请选择工序</>;
  }
  return (<Space>
    {
      value.map((item, index) => {
        return <Tag key={index} color={item.isCommon && 'blue'}>{item.toolResult && item.toolResult.name}</Tag>;
      })
    }
  </Space>);
};

export const Sop = (props) => {
  const {value, sopId} = props;
  const ref = useRef();
  return value ?
    <Space>
      {value.name}
      <Button onClick={() => {
        ref.current.open(false);
      }}>查看</Button>
      <Drawer ref={ref} onSuccess={() => {
        ref.current.close();
      }} headTitle="SOP作业指导" component={SopDetailList} id={sopId} />
    </Space>
    :
    '请选择工序';
};

export const ShipNote = (props) => {
  return props.value ? props.value : '无';
};

export const SkuShow = (props) => {
  const {value} = props;

  const skuIds = [];

  if (value && value.length > 0) {
    value.map((item) => {
      if (item && item.skuId) {
        skuIds.push(item.skuId);
      }
      return null;
    });
  }

  const {loading, data, run} = useRequest(skuList, {manual: true});

  useEffect(() => {
    if (skuIds.length > 0) {
      run({
        data: {
          skuIds
        },
      });
    }
  }, [skuIds.length]);

  if (loading) {
    return <Spin />;
  }

  if (!value || !data) {
    return <Empty />;
  }

  return <List
    bordered
    dataSource={data}
    renderItem={(item) => {
      const skus = value && value.filter((items) => {
        return items && (items.skuId === item.skuId);
      });
      let number = 0;
      if (skus.length > 0) {
        number = skus[0].number;
      }
      return <List.Item>
        <Space direction="vertical">
          <SkuResultSkuJsons skuResult={item} />
          <div>
            数量：{number}
          </div>
        </Space>
      </List.Item>;
    }}
  />;
};


