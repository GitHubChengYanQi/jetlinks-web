/**
 * 竞争对手报价字段配置页
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Select} from 'antd';
import {useRequest} from '@/util/Request';
import * as apiUrl from '../competitorQuoteUrl';

export const CompetitorsQuote = (props) =>{
  return (<InputNumber {...props}/>);
};

export const CompetitorId = (props) =>{
  return (<Input {...props}/>);
  // const {val} = props;
  // const {loading,data} = useRequest({...apiUrl.competitorrQuoteList,data:{businessId:val.businessId}});
  // return (<Select options={data} loading={loading}  defaultValue={props.value && [`${props.value}`]} onChange={(value)=>{
  //   props.onChange(value);
  // }}  showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase())} allowClear />);
};
export const QuoteStatus = (props) =>{
  return (<Input {...props}/>);
};
export const CampType = (props) =>{
  return (<Input {...props}/>);
};
export const RelatedCustomers = (props) =>{
  return (<Input {...props}/>);
};
export const QuoteType = (props) =>{
  return (<Input {...props}/>);
};
export const QuoteDate = (props) =>{
  return (<Input {...props}/>);
};
