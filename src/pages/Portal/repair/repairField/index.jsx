/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useEffect} from 'react';
import UpLoadImg from '@/components/Upload';
import {Input,Select as AntSelect} from 'antd';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import * as apiUrl from '../repairUrl';

export const CompanyId = (props) =>{
  return (<Select api={apiUrl.companyIdSelect} {...props}/>);
};
export const ItemImgUrl = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const ItemId = (props) =>{

  const {repair} = props;


  const {loading:deliveryLoading,data:deliveryData,run:deliveryRun} = useRequest({...apiUrl.delivery,data:{customerId: repair && repair.customerId}},{manual:true});


    const {loading ,data,run} = useRequest({...apiUrl.deliveryDetails,data:{deliveryId:deliveryData && deliveryData.deliveryId}},{manual:true});






  const delivery = data ? data.map((value,index)=>{
    return {
      label:value.itemsResult.name,
      value:value.deliveryDetailsId
    };
  }) : [];



  return (<AntSelect options={delivery} loading={loading && deliveryLoading} {...props}/>);
};
export const ServiceType = (props) =>{
  return (<AntSelect style={{width:200}} options={[{label:'设备项修',value:'设备项修' }]} {...props}/>);
};
export const ExpectTime = (props) =>{
  return (<DatePicker {...props}/>);
};
export const Comment = (props) =>{
  return (<Input.TextArea {...props}/>);
};

export const Money = (props) =>{
  return (<Input {...props}/>);
};
export const QualityType = (props) =>{
  return (<AntSelect style={{width:200}} options={[{label:'质保内',value:'质保内'},{label:'质保外',value:'质保外'}]}  {...props}/>);
};
export const ContractType = (props) =>{
  return (<AntSelect style={{width:200}} options={[{label:'合同内',value:'合同内'},{label:'合同外',value:'合同外'}]} {...props}/>);
};

export const CustomerId = (props) =>{
  return (<Select api={apiUrl.CustomerIdListSelect} {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const Province = (props) =>{
  return (<Input {...props}/>);
};
export const City = (props) =>{
  return (<Input {...props}/>);
};
export const Area = (props) =>{
  return (<Input {...props}/>);
};
export const Address = (props) =>{
  return (<Input {...props}/>);
};
export const People = (props) =>{
  return (<Input {...props}/>);
};
export const Position = (props) =>{
  return (<Input {...props}/>);
};
export const Telephone = (props) => {
  return (<Input {...props} />);
};
