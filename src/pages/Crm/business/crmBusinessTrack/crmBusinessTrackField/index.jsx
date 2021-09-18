/**
 * 项目跟踪表字段配置页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import DatePicker from '@/components/DatePicker';
import * as apiUrl from '@/pages/Crm/competitorQuote/competitorQuoteUrl';
import {useRequest} from '@/util/Request';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CompetitorEdit from '@/pages/Crm/competitor/competitorEdit';
import UpLoadImg from '@/components/Upload';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import {BusinessNameListSelect} from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackUrl';

export const NoteId = (props) => {
  return (<Input {...props} />);
};
export const Note = (props) => {
  return (<Input.TextArea cols={5} rows={6} {...props} />);
};

export const Message = (props) => {
  return (<Input.TextArea cols={5} rows={6} {...props} />);
};

export const Time = (props) => {
  return (<DatePicker {...props} />);
};

export const Image = (props) => {
  return (<UpLoadImg {...props} />);
};

export const Longitude = (props) =>{
  const {location} = props;
  if (location) {
    props.onChange(location);
  }
  return (<Input   {...props} disabled/>);
};
export const Latitude = (props) =>{
  const {location} = props;
  if (location) {
    props.onChange(location);
  }
  return (<Input   {...props} disabled/>);
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

export const CustomerId = (props) => {
  return (<Select api={apiUrl.customerIdSelect} {...props} disabled={props.track} />);
};

export const Classify = (props) => {
  const {onChange} = props;
  return (<AntdSelect options={[{label:'日常',value:0},{label:'商机',value:1},{label:'合同',value:2},{label:'订单',value:3},{label:'回款',value:4}]} onChange={(value) => {
    onChange(value);
  }} {...props}  />);
};
export const ContractId = (props) => {
  return (<Input {...props}  />);
};

export const OrderId = (props) => {
  return (<Input {...props}  />);
};
export const Name = (props) => {
  return (<Input {...props}  />);
};

export const BusinessId = (props) => {
  return (<Select api={apiUrl.BusinessNameListSelect} {...props} />);
};
export const CompetitorsQuoteId = (props) => {
  const {competitorsQuoteId} = props;
  if (competitorsQuoteId){
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
    <div style={{width:300}}>
      <AntdSelect allowClear showSearch style={{width:200}} options={data || []} loading={loading} {...props}   filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}  />
      <Button style={{width:100,margin:0}} type="primary"  onClick={()=>{
        ref.current.open(false);}}>
        新增对手
      </Button>
      <Modal width={1000}  title="竞争对手" component={CompetitorEdit} onSuccess={() => {
        ref.current.close();
        getData();
      }} ref={ref}
      onChange={(res)=>{
        if(res){
          props.onChange(res && res.data && res.data.competitorId);
        }else{
          props.onChange();
        }
      }} />
    </div>
  );
};
export const CompetitorsQuote = (props) =>{
  return (<InputNumber style={{width:300}}  {...props}/>);
};
