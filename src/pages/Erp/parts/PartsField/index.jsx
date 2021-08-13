/**
 * 清单字段配置页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Select from '@/components/Select';
import Modal2 from '@/components/Modal';
import Search from "antd/es/input/Search";
import ItemsList from "@/pages/Erp/items/ItemsList";
import * as apiUrl from '../PartsUrl';


const w = 200;

export const ItemId = (props) =>{
  return (<Select  api={apiUrl.itemIdSelect} {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select   api={apiUrl.brandIdSelect} {...props}/>);
};

export const Item = (props) =>{
  return (<Select api={apiUrl.ProductNameListSelect} Select {...props} />);
//   const {onChange} = props;
//   const ref = useRef(null);
//   const tableRef = useRef(null);
//   const [itemName, setItemName] = useState(props.val);
//   const onSearch = value => ref.current.open(false);;
//   return (
//     <>
//       <div>
//         <Search onSearch={onSearch}
//           style={{width:250}}
//           placeholder="请搜索仓库"
//           enterButton
//           {...props}
//           value={itemName}/>
//       </div>
//       <Modal2 width={1500} title="选择" component={ItemsList}
//         onSuccess={() => {
//           ref.current.close();
//         }} ref={ref}
//         choose={(items) =>{
//           onChange(items.itemId);
//           setItemName(items.name);
//         }}
//       />
//     </>);
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
