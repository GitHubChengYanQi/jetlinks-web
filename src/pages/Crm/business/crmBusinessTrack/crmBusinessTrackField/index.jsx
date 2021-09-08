/**
 * 商机跟踪表字段配置页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React from 'react';
import {Input, InputNumber, TimePicker, Select as AntdSelect, Checkbox, Radio} from 'antd';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/competitorQuote/competitorQuoteUrl';

export const NoteId = (props) => {
  return (<Input {...props} />);
};
export const Note = (props) => {
  return (<Input.TextArea cols={5} rows={7} {...props} />);
};

export const Time = (props) => {
  return (<DatePicker {...props} />);
};


export const Offer = (props) => {
  const {visi} = props;
  return (<AntdSelect
    options={[
      {label: '否', value: '0'},
      {label: '是', value: '1'},
    ]}
    {...props} onChange={(value) => {
    if (value === '1') {
      visi(true);
    } else {
      visi(false);
    }
  }} />);
};

export const Money = (props) => {
  return (<InputNumber {...props} />);
};

export const Type = (props) => {
  return (<AntdSelect
    options={[
      {label: '上门培训', value: '上门培训'},
      {label: '视频辅导', value: '视频辅导'},
      {label: '上门维修', value: '上门维修'},
      {label: '客户投诉', value: '客户投诉'},
      {label: '客户反馈', value: '客户反馈'},
      {label: '产品发货', value: '产品发货'},
      {label: '产品安装', value: '产品安装'},
      {label: '定期检修', value: '定期检修'}
    ]}
    {...props} />);
};
export const BusinessId = (props) => {
  props.onChange(props.val.businessId);
  return (<Input {...props} value={props.val.businessName} disabled />);
};
export const CompetitorsQuoteId = (props) => {
  const {competitorsQuoteId} = props;
  if (competitorsQuoteId){
    console.log(competitorsQuoteId);
    props.onChange(competitorsQuoteId.competitorsQuoteId);
  }
  return (<Input {...props} />);
};
export const UserId = (props) => {
  props.onChange(props.val.person);
  return (<Input {...props} value={props.val.user.name} disabled />);
};

export const CompetitorId = (props) =>{
  return (<Select  api={apiUrl.competitorListSelect}  {...props}/>);
};
export const CompetitorsQuote = (props) =>{
  return (<InputNumber  {...props}/>);
};
