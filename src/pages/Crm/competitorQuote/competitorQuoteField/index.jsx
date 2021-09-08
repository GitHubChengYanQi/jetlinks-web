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
  const {competitorId} = props;
  if (competitorId){
    props.onChange(competitorId);
  }
  return (<Select disabled={competitorId}  api={apiUrl.competitorListSelect}  {...props}/>);
};
export const QuoteStatus = (props) =>{
  return (<AntdSelect options={[{label:'无需审批',value:0},{label:'待询价',value:1},{label:'询价中',value:2}]} {...props}/>);
};
export const CampType = (props) =>{
  return (<AntdSelect options={[{label:'我的报价',value:1},{label:'对手报价',value:0}]} {...props}/>);
};
export const BusinessId = (props) =>{
  const {businessId} = props;
  if (businessId){
    props.onChange(businessId);
  }
  return (<Select disabled={businessId} api={apiUrl.BusinessNameListSelect}  {...props}/>);
};
export const QuoteType = (props) =>{
  return (<Input  {...props}/>);
};
export const QuoteDate = (props) =>{
  return (<Input  {...props}/>);
};
