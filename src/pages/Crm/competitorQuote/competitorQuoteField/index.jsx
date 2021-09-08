/**
 * 竞争对手报价字段配置页
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React from 'react';
import {Input, InputNumber, Select as AntdSelect} from 'antd';
import * as apiUrl from '../competitorQuoteUrl';
import Select from '@/components/Select';
import {competitorListSelect} from '../competitorQuoteUrl';

export const CompetitorsQuote = (props) =>{
  return (<InputNumber  {...props}/>);
};

export const CompetitorId = (props) =>{
  return (<Select  api={apiUrl.competitorListSelect}  {...props}/>);
  // const {val} = props;
  // const {loading,data} = useRequest({...apiUrl.competitorrQuoteList,data:{businessId:val.businessId}});
  // return (<Select options={data} loading={loading}  defaultValue={props.value && [`${props.value}`]} onChange={(value)=>{
  //   props.onChange(value);
  // }}  showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase())} allowClear />);
};
export const QuoteStatus = (props) =>{
  return (<AntdSelect options={[{label:'无需审批',value:0},{label:'待询价',value:1},{label:'询价中',value:2}]} {...props}/>);
};
export const CampType = (props) =>{
  return (<AntdSelect options={[{label:'我的报价',value:1},{label:'对手报价',value:0}]} {...props}/>);
};
export const BusinessId = (props) =>{
  return (<Select  api={apiUrl.BusinessNameListSelect}  {...props}/>);
};
export const QuoteType = (props) =>{
  return (<Input  {...props}/>);
};
export const QuoteDate = (props) =>{
  return (<Input  {...props}/>);
};
