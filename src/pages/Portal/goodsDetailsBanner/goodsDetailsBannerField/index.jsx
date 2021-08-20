/**
 * 商品轮播图字段配置页
 *
 * @author siqiang
 * @Date 2021-08-19 16:34:29
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../goodsDetailsBannerUrl';

export const Sort = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<Input {...props}/>);
};
