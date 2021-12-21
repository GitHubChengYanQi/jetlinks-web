/**
 * 采购申请字段配置页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React from 'react';
import {Input, InputNumber,} from 'antd';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import DatePicker from '@/components/DatePicker';
import Coding from '@/pages/Erp/tool/components/Coding';
import moment from 'moment';
import Select from '@/components/Select';
import {unitListSelect} from '@/pages/Erp/spu/spuUrl';

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};
export const Type = (props) => {
  return (<Input {...props} />);
};
export const Note = (props) => {
  return (<Input.TextArea {...props} />);
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
  return (<DatePicker disabledDate={(current) => {
    return current && current < moment().endOf('day');
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
  return (<Select border={false} disabled api={unitListSelect} width={100} {...props} />);
};
