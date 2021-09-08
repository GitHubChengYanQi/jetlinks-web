/**
 * 商机跟踪表字段配置页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/competitorQuote/competitorQuoteUrl';
import {useRequest} from '@/util/Request';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import CompetitorEdit from '@/pages/Crm/competitor/competitorEdit';
import UpLoadImg from '@/components/Upload';

export const NoteId = (props) => {
  return (<Input {...props} />);
};
export const Note = (props) => {
  return (<Input.TextArea cols={5} rows={7} {...props} />);
};

export const Time = (props) => {
  return (<DatePicker {...props} />);
};

export const Image = (props) => {
  return (<UpLoadImg {...props} />);
};

export const Longitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Latitude = (props) =>{
  return (<InputNumber   {...props}/>);
};

export const Money = (props) => {
  return (<InputNumber {...props} />);
};
export const QuoteStatus = (props) =>{
  return (<AntdSelect options={[{label:'无需审批',value:0},{label:'待询价',value:1},{label:'询价中',value:2}]} {...props}/>);
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
  const ref = useRef(null);

  const {loading,data,run:getData} = useRequest(apiUrl.competitorListSelect);

  return (
    <>
      <AntdSelect allowClear showSearch style={{width:200}} options={data || []} loading={loading} {...props}   filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}  />
      <Button type="primary"  onClick={()=>{
        ref.current.open(false);}}>
        新增对手
      </Button>
      <CreateNewCustomer onSuccess={() => {
        ref.current.close();
        getData();
      }} refModal={ref} model={CompetitorEdit} widths={1300}  position={(res)=>{
        props.onChange(res && res.data && res.data.competitorId);
      }}/>
    </>
  );
};
export const CompetitorsQuote = (props) =>{
  return (<InputNumber  {...props}/>);
};
