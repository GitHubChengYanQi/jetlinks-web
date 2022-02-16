import React, {useEffect, useRef} from 'react';
import {Button, Space, Spin, Tag} from 'antd';
import Drawer from '@/components/Drawer';
import SopDetailList from '@/pages/ReSearch/sop/sopDetail/sopDetailList';
import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';


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

  if (value.length > 0) {
    value.map((item) => {
      if (item) {
        skuIds.push(item.skuId);
      }
      return null;
    });
  }

  const {loading, data, run} = useRequest(skuList, {manual: true});

  useEffect(() => {
    if (skuIds.length > 0) {
      run({
        skuIds,
      });
    }
  }, [skuIds.length]);

  if (loading) {
    return <Spin />;
  }

  return '无';
};


