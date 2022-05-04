/**
 * 流程主表字段配置页
 *
 * @author c
 * @Date 2021-11-19 10:58:01
 */

import React, {useEffect} from 'react';
import {Input, Select as AntdSelect, Spin} from 'antd';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {useRequest} from '@/util/Request';

export const ProcessName = (props) => {
  return (<Input {...props} />);
};

export const Type = ({value, onChange}) => {

  const api = {url: '/processType/list', method: 'GET'};
  const {loading, data} = useRequest(api);

  if (loading) {
    return <Spin />;
  }

  return (<AntdSelect
    style={{width:200}}
    value={value && value.value}
    options={data.map((item) => {
      return {
        label: item.name,
        value: item.type,
        details: item.details,
      };
    })}
    onChange={(value, option) => {
      onChange(option);
    }}
  />);
};

export const Module = (props) => {
  const {types = [], ...other} = props;

  return (<AntdSelect options={types.map((item) => {
    return {
      label: item.moduleName,
      value: item.module,
    };
  })} {...other} />);
};
export const FormId = (props) => {
  return (<Input {...props} />);
};

export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};

