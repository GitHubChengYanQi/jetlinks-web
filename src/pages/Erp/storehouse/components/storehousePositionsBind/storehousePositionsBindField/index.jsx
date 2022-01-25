/**
 * 库位绑定物料表字段配置页
 *
 * @author song
 * @Date 2022-01-20 11:15:05
 */

import React from 'react';
import {Input} from 'antd';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';

export const PositionId = (props) =>{
  return (<Input {...props}/>);
};
export const SkuId = (props) =>{
  return (<SelectSku {...props}/>);
};

export const SpuId = (props) =>{
  return (<SelectSku {...props}/>);
};

export const Sort = (props) =>{
  return (<Input {...props}/>);
};
export const CustomerId = (props) =>{
  return (<Input {...props}/>);
};
export const BrandId = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
