/**
 * 供应商供应物料字段配置页
 *
 * @author song
 * @Date 2021-12-20 10:08:44
 */

import React, {useEffect} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Spin} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../supplyUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {useRequest} from '@/util/Request';
import {supplyAdd, supplyListSelect} from '../supplyUrl';

export const SkuId = (props) => {
  const {customerId, ...other} = props;
  const {loading, data, run} = useRequest(supplyListSelect, {manual: true});
  useEffect(() => {
    run({
      data: {
        customerId,
      }
    });
  }, []);
  if (loading)
    return <Spin />;

  const skuIds = [];
  if (data)
    data.map((items) => {
      return skuIds.push(items.label);
    });

  return (<SelectSku {...other} skuIds={skuIds} />);
};
export const CustomerId = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
