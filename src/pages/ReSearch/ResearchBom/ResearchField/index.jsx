/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React from 'react';
import {Input} from 'antd';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';


export const PartName = (props) => {
  return (<Input style={{width: 200}} {...props} />);
};

export const Name = (props) => {
  return (<Input style={{width: 200}} {...props} />);
};

export const SkuId = (props) => {
  return (<SelectSku width={200} {...props} />);
};
