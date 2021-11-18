/**
 * 入库表字段配置页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber, Button} from 'antd';
import Select from '@/components/Select';
import Drawer from '@/components/Drawer';
import DatePicker from '@/components/DatePicker';
import StorehouseList from '@/pages/Erp/storehouse/StorehouseList';
import ItemsList from '@/pages/Erp/items/ItemsList';
import * as apiUrl from '../InstockUrl';
import {UserIdSelect} from '../InstockUrl';
import SelectSpu from '@/pages/Erp/spu/components/SelectSpu';
import SpuAttribute from '@/pages/Erp/instock/components/SpuAttribute';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import Coding from '@/pages/Erp/tool/components/Coding';
import {unitListSelect} from '@/pages/Erp/spu/spuUrl';

const {Search} = Input;


export const Item = (props) => {
  const {onChange, val} = props;
  const [value, setValue] = useState(val);
  const ref = useRef(null);
  return (<>
    <Search style={{width: 200}} {...props} value={value} onSearch={() => {
      ref.current.open(false);
    }} enterButton />
    <Drawer width={1700} title="选择" component={ItemsList} onSuccess={() => {
      ref.current.close();
    }} ref={ref} choose={(choose) => {
      setValue(choose.name);
      onChange(choose.itemId);
      ref.current.close();
    }} />
  </>);
};
export const ItemId = (props) => {
  return (<Input   {...props} />);
};
export const RegisterTime = (props) => {
  return (
    <DatePicker  {...props} />
  );
};
export const StorehouseId = (props) => {
  const {onChange, val} = props;
  const [value, setValue] = useState(val);
  const ref = useRef(null);
  return (<>
    <Search style={{width: 200}} {...props} value={value} onSearch={() => {
      ref.current.open(false);
    }} enterButton />
    <Drawer width={1700} title="选择" component={StorehouseList} onSuccess={() => {
      ref.current.close();
    }} ref={ref} choose={(choose) => {
      setValue(choose.name);
      onChange(choose.storehouseId);
      ref.current.close();
    }} />
  </>);
};
export const Number = (props) => {
  return (<><InputNumber min={0}   {...props} /></>);
};
export const CostPrice = (props) => {
  return (<InputNumber min={0}   {...props} />);
};

export const SellingPrice = (props) => {
  return (<InputNumber min={0}   {...props} />);
};

export const Unit = (props) => {
  return (<Select border={false} api={unitListSelect} disabled showArrow={false} width={60} {...props} />);
};

export const BrandId = (props) => {
  return (<Select api={apiUrl.brandIdSelect} {...props} />);
};
export const ItemIdSelect = (props) => {
  return (<Select api={apiUrl.itemIdSelect} {...props} />);
};
export const StoreHouseSelect = (props) => {
  return (<Select width={200} api={apiUrl.storeHouseSelect} {...props} />);
};
// 产品名称
export const itemId = (props) => {
  return (<Select api={apiUrl.ProductNameListSelect}  {...props} />);
};
export const UserId = (props) => {
  return (<Select width={200} api={apiUrl.UserIdSelect}  {...props} />);
};

export const barcode = (props) => {
  return (<Input   {...props} />);
};

export const SpuId = (props) => {

  const {...other} = props;

  return (<SelectSpu
    {...other} />);
};

export const Remake = (props) => {

  const {sku, select, ...other} = props;

  return (<SpuAttribute sku={sku} select={select} {...other} />);
};

export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};
