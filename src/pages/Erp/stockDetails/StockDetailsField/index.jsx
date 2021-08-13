/**
 * 仓库产品明细表字段配置页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import {Input, InputNumber, DatePicker, Button} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../StockDetailsUrl/index';

export const Stock = (props) =>{
  return (<Input {...props} />);
};
export const StockId = (props) =>{
  return (<Select api={apiUrl.stockIdSelect}   {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.ProductNameListSelect}   {...props}/>);
};
export const  Storehouse= (props) =>{
  return (<Select api={apiUrl.storehouseIdSelect}   {...props}/>);
};
export const Price = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const StorageTime = (props) =>{
  return (<DatePicker   {...props}/>);
};

export const  brandeId= (props) =>{
  return (<Select api={apiUrl.brandListSelect}   {...props}/>);
};


