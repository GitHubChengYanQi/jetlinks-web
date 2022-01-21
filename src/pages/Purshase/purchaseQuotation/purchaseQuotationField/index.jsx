/**
 * 采购报价表单字段配置页
 *
 * @author Captain_Jazz
 * @Date 2021-12-22 11:17:27
 */

import React, {useEffect, useRef, useState} from 'react';
import {Input, InputNumber, Select as AntdSelect, Checkbox, Space} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {taxRateListSelect} from '@/pages/Purshase/taxRate/taxRateUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {customerIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {brandIdSelect} from '@/pages/Erp/stock/StockUrl';
import Drawer from '@/components/Drawer';
import BrandEdit from '@/pages/Erp/brand/BrandEdit';
import {useRequest} from '@/util/Request';

export const SkuId = (props) => {
  return (<SkuResultSkuJsons skuResult={props.value} />);
};
export const SkuListSelect = (props) => {
  return (<SelectSku {...props} />);
};
export const SupplyId = (props) => {
  return (<SelectCustomer {...props} />);
};
export const Price = (props) => {
  return (<InputNumber min={1} {...props} />);
};
export const AllPrice = (props) => {
  const {value} = props;
  return (<div style={{width: 90, textAlign: 'center'}}>{value || 0}</div>);
};
export const TaxPrice = (props) => {
  return (<InputNumber min={1} {...props} />);
};
export const Money = (props) => {
  const {value} = props;
  return (<div style={{width: 90, textAlign: 'center'}}>{value && value.toFixed(2) || 0}</div>);
};
export const AllAfterTax = (props) => {
  const {value} = props;
  return (<div style={{width: 90, textAlign: 'center'}}>{value || 0}</div>);
};
export const CustomerId = (props) => {
  return (<Select api={customerIdSelect} data={{supply: 1}} width={200}  {...props} />);
};
export const InvoiceType = (props) => {
  return (
    <AntdSelect options={[{label: '普票', value: '普票'}, {label: '专票', value: '专票'},]} style={{width: 120}} {...props} />);
};
export const PaymentMethod = (props) => {
  return (<Input style={{width: 120}} {...props} />);
};
export const PeriodOfValidity = (props) => {
  return (<DatePicker width={120} {...props} />);
};
export const Total = (props) => {
  return (<InputNumber min={1} {...props} />);
};
export const IsTax = (props) => {
  return (<Input {...props} />);
};
export const PreTax = (props) => {
  return (<InputNumber {...props} />);
};
export const Freight = (props) => {
  return (<Input {...props} />);
};
export const AfterTax = (props) => {
  return (<InputNumber {...props} />);
};
export const IsFreight = (props) => {
  return (<Checkbox {...props} checked={props.value} />);
};
export const Source = (props) => {
  return (<AntdSelect style={{width: 200}} options={[
    {
      value: 'toBuyPlan',
      label: '待买计划'
    },
    {
      value: 'purchasePlan',
      label: '采购计划'
    },
    {
      value: 'inquiryTask',
      label: '询价任务',
    },
    {
      value: 'sku',
      label: '物料',
    }
  ]} {...props} />);
};
export const SourceId = (props) => {
  return (<Input {...props} />);
};
export const FornId = (props) => {
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
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};

export const DeliveryDate = (props) => {
  return (<DatePicker width={120}  {...props} />);
};

export const BrandResult = (props) => {
  return (<div style={{width: 200, textAlign: 'center'}}>{props.value && props.value.brandName}</div>);
};


export const BrandId = (props) => {
  return (<Select width={200} api={brandIdSelect} {...props} />);
};

export const BrandSelect = (props) => {

  const {isSupplySku, data, refresh, brandIds, ...other} = props;

  const options = data ? data.filter((item) => {
    return !brandIds ? true : brandIds.includes(item.value);
  }) : [];

  const ref = useRef();

  return (<Space style={{width: 200}}>
    <AntdSelect
      style={{width: 170}}
      options={options || []}
      allowClear
      showSearch
      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      {...other}
    />
    {isSupplySku && <PlusCircleOutlined onClick={() => {
      ref.current.open(false);
    }} />}
    <Drawer
      title="添加品牌"
      component={BrandEdit}
      onSuccess={(res) => {
        refresh();
        ref.current.close();
        if (res) {
          props.onChange(res.data);
        }
      }}
      ref={ref} />
  </Space>);
};


export const TaxRateId = (props) => {
  const {value, onChange, data} = props;
  return (
    <AntdSelect
      style={{width: 120}}
      options={data || []}
      placeholder="选择税率"
      value={typeof value === 'object' ? value.value : value}
      allowClear
      showSearch
      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={(value, option) => {
        onChange(option);
      }}
    />
  );
};
