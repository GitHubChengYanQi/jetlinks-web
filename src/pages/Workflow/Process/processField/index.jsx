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

  useEffect(() => {
    if (value && data) {
      const type = data.filter(item => item.type === value);
      if (type && type[0]) {
        onChange({
          label: type[0].name,
          value: type[0].type,
          details: type[0].details,
          default: true,
        });
      }
    }
  }, [data]);

  if (loading) {
    return <Spin />;
  }

  return (<AntdSelect
    style={{minWidth: 200}}
    value={typeof value === 'object' ? value.value : value}
    options={data ? data.map((item) => {
      return {
        label: item.name,
        value: item.type,
        details: item.details,
      };
    }) : []}
    onChange={(value, option) => {
      onChange(option);
    }}
  />);
};

export const Module = (props) => {
  const {types = [], ...other} = props;

  return (<AntdSelect
    style={{minWidth: 200}}
    options={types.map((item) => {
      return {
        label: item.moduleName,
        value: item.module,
      };
    })} {...other} />);
};

export const TableModule = (props) => {

  const api = {url: '/processType/list', method: 'GET'};
  const {loading, data} = useRequest(api);

  if (loading) {
    return <Spin />;
  }

  const options = [];

  data && data.map((item) => {
    return item.details.map((detailItem) => {
      return options.push({label: detailItem.moduleName, value: detailItem.module});
    });
  });

  return (<AntdSelect style={{width: 200}} options={options} {...props} />);
};

export const FormId = (props) => {
  return (<Input {...props} />);
};

export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};

