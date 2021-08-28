/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useEffect, useState} from 'react';
import UpLoadImg from '@/components/Upload';
import {Input, InputNumber, Select as AntSelect, Upload} from 'antd';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import * as apiUrl from '../repairUrl';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import TreeSelect from '@/components/TreeSelect';
import Cascader from '@/components/Cascader';

export const CompanyId = (props) => {
  return (<Select api={apiUrl.companyIdSelect} {...props} />);
};
export const ItemImgUrl = (props) => {
  return (
    <>
      <UpLoadImg {...props} />
    </>
  );
};
export const Items = (props) => {
  return (<Select api={apiUrl.itemIdSelect} {...props} />);
};
export const ItemId = (props) => {

  const {repair, state} = props;


  const delivery = repair ? repair.map((value, index) => {
    return {
      label: value.itemsResult.name,
      value: value.deliveryDetailsId
    };
  }) : null;

  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [repair]);
  }


  return (<AntSelect options={delivery}  {...props} />);
};
export const ServiceType = (props) => {
  return (<AntSelect style={{width: 200}} options={[{label: '设备项修', value: '设备项修'}]} {...props} />);
};
export const ExpectTime = (props) => {
  return (<DatePicker {...props} />);
};
export const Comment = (props) => {
  return (<Input.TextArea {...props} />);
};

export const Money = (props) => {
  return (<InputNumber {...props} />);
};
export const QualityType = (props) => {
  return (<AntSelect
    style={{width: 200}}
    options={[{label: '质保内', value: '质保内'}, {label: '质保外', value: '质保外'}]}  {...props} />);
};
export const ContractType = (props) => {
  return (<AntSelect
    style={{width: 200}}
    options={[{label: '合同内', value: '合同内'}, {label: '合同外', value: '合同外'}]} {...props} />);
};

export const CustomerId = (props) => {

  const {customerId, onChange} = props;


  const {loading, data, run} = useRequest({
    ...apiUrl.delivery,
    data: {}
  });


  const delivery = data ? data.map((value, index) => {
    return {
      label: value.customerResult.customerName,
      value: value.customerId
    };
  }) : null;


  return (<AntSelect options={delivery} loading={loading} {...props} onChange={(value) => {
    onChange(value);
    customerId(value);
  }} />);

};
export const ImgUrl = (props) => {
  return (<UpLoadImg {...props} />);
};
export const Province = (props) => {
  return ( <Cascader api={apiUrl.commonArea} {...props} placeholder="请选择地区" />);
};
export const City = (props) => {
  return (<TreeSelect api={apiUrl.commonArea} {...props} />);
};
export const Area = (props) => {
  return (<TreeSelect api={apiUrl.commonArea} {...props} />);
};
export const Address = (props) => {
  return (<Input {...props} />);
};
export const People = (props) => {
  return (<Input {...props} />);
};
export const Position = (props) => {
  return (<Input {...props} />);
};
export const Telephone = (props) => {
  return (<Input {...props} />);
};
