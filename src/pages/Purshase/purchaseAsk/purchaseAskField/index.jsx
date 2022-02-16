/**
 * 采购申请字段配置页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React from 'react';
import {Input, InputNumber, Select as AntSelect, Spin} from 'antd';
import moment from 'moment';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import DatePicker from '@/components/DatePicker';
import Coding from '@/pages/Erp/tool/components/Coding';
import Select from '@/components/Select';
import {unitListSelect} from '@/pages/Erp/spu/spuUrl';
import {useRequest} from '@/util/Request';
import {brandIdSelect} from '@/pages/Erp/stock/StockUrl';

export const Codings = (props) => {

  return (<Coding {...props} />);
};
export const Type = (props) => {
  return (<AntSelect options={[{
    label:'生产采购',
    value:'0',
  },{
    label:'库存采购',
    value:'1',
  },{
    label:'行政采购',
    value:'2',
  },{
    label:'销售采购',
    value:'3',
  },{
    label:'销售采购',
    value:'4',
  },]} {...props} />);
};

export const BrandId = (props) => {
  const {loading, data} = useRequest(brandIdSelect);

  if (loading) {
    return <Spin />;
  }

  if (!data) {
    return <></>;
  }

  const options = [
    {label:'无指定品牌',value:0},
    ...data,
  ];

  return (<AntSelect
    options={options}
    {...props}
    allowClear
    showSearch
    filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  />);
};
export const Note = (props) => {
  return (<Input.TextArea  {...props} />);
};
export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};
export const Status = (props) => {
  return (<Input {...props} />);
};
export const Money = (props) => {
  return (<Input {...props} />);
};
export const Number = (props) => {
  return (<Input {...props} />);
};
export const TypeNumber = (props) => {
  return (<Input {...props} />);
};
export const Source = (props) => {
  return (<Input {...props} />);
};
export const SourceId = (props) => {
  return (<Input {...props} />);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const Date = (props) => {
  return (<DatePicker disabledDate={(currentDate) => {
    return currentDate && currentDate < moment().subtract(1, 'days');
  }} {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const LisingNote = (props) => {
  return (<Input.TextArea {...props} />);
};
export const ApplyNumber = (props) => {
  return (<InputNumber min={1} {...props} />);
};

export const AvailableNumber = (props) => {
  return (<InputNumber disabled min={1} {...props} />);
};

export const SelectCoding = (props) => {
  return (<Input {...props} />);
};
export const UnitId = (props) => {
  return (<Select border={false} disabled showArrow={false} api={unitListSelect} width={100} {...props} />);
};
