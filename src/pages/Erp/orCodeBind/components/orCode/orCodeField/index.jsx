/**
 * 二维码字段配置页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../orCodeUrl';

export const Type = (props) =>{
  return (<AntdSelect
    allowClear
    options={
      [
        {label:'空码',value:'null'},
        {label:'实物',value:'item'},
        {label:'物料',value:'sku'},
        {label:'产品',value:'spu'},
        {label:'入库',value:'instock'},
        {label:'出库',value:'outstock'},
        {label:'库存',value:'stock'},
        {label:'仓库',value:'storehouse'},
        {label:'库位',value:'storehousePositions'},
      ]
    }
    {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber style={{width:200}} placeholder='数量（最多1000个）' min={1} max={1000} step={100} {...props} />);
};
export const Data = (props) =>{
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
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
