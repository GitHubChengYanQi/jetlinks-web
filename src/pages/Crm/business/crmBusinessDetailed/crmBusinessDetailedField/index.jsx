/**
 * 项目明细表字段配置页
 *
 * @author qr
 * @Date 2021-08-04 13:17:57
 */

import React, {useEffect} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../crmBusinessDetailedUrl';
import {useRequest} from '@/util/Request';

export const BusinessId = (props) => {
  return (<Select api={apiUrl.BusinessId} {...props} />);
};
// 套餐
export const PackageId = (props) => {
  return (<Select api={apiUrl.erpPackageNameList} {...props} />);
};

// 产品名称
export const ItemId = (props) => {
  return (<Select api={apiUrl.ProductNameListSelect} {...props} />);
};
export const BrandId = (props) => {
  const {item} = props;
  const {data} = useRequest({url: '/itemBrandBind/list', method: 'POST', data: {itemId: item}});


  const datas = data && data.length > 0 ? data.map((items, index) => {
    return {
      label: items.brandResult && items.brandResult.brandName,
      value: items.brandId
    };
  }) : [];

  useEffect(() => {
    if (datas.length > 0) {
      props.onChange(datas[0].value);
    }else {
      props.onChange(null);
    }
  }, [datas]);


  return (<AntdSelect options={datas} {...props} />);
};

export const Quantity = (props) => {
  return (<Input {...props} />);
};
export const salePrice = (props) => {
  return (<Input {...props} />);
};
export const totalPrice = (props) => {
  return (<Input {...props} />);
};
