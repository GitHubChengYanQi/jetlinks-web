/**
 * 清单字段配置页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../PartsUrl';
import Drawer from '@/components/Drawer';
import Items from '@/pages/Erp/parts/PartsEdit/components/Items';
import Search from "antd/es/input/Search";

const w = 200;

export const ItemId = (props) =>{
  return (<Select  api={apiUrl.itemIdSelect} {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select   api={apiUrl.brandIdSelect} {...props}/>);
};

export const Item = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const onSearch = value => ref.current.open(false);;
  return (
    <>
      <div>
        <Search onSearch={onSearch}
          style={{width:250}}
          placeholder="请搜索仓库"
          enterButton
          {...props}/>
      </div>
      <Drawer width={1500} title="选择" component={Items}  onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
    </>);
};

export const Name = (props) =>{
  return (<Input   {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber   {...props}/>);
};

export const brandName = (props) =>{
  return (<Input   {...props}/>);
};
