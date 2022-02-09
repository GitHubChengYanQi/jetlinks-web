/**
 * 清单字段配置页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Input,
  InputNumber,
  TimePicker,
  DatePicker,
  Select as AntdSelect,
  Checkbox,
  Radio,
  Button,
  Card,
  Select as AntSelect
} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../PartsUrl';
import {spuListSelect} from '../PartsUrl';
import SelectSpu from '@/pages/Erp/spu/components/SelectSpu';
import { useRequest} from '@/util/Request';
import Attribute from '@/pages/Erp/instock/components/Attribute';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuAttribute from '@/pages/Erp/instock/components/SpuAttribute';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';

export const ItemId = (props) => {
  return (<Select api={apiUrl.itemIdSelect} {...props} />);
};
export const BrandId = (props) => {
  return (<Select api={apiUrl.brandIdSelect} {...props} />);
};

export const Item = (props) => {
  return (<Select api={apiUrl.ProductNameListSelect} Select {...props} />);
};

export const Name = (props) => {
  return (<Input.TextArea   {...props} />);
};

export const SpuId = (props) => {

  const {onChange, ...other} = props;

  return (<SelectSpu
    onChange={async (value) => {
      onChange(value);
    }}
    {...other} />);
};

export const Remake = (props) => {

  const {sku, select, ...other} = props;

  return (<SpuAttribute sku={sku} select={select} {...other} />);
};

export const Number = (props) => {
  return (<InputNumber min={0}   {...props} />);
};

export const PartName = (props) => {
  return (<Input {...props} />);
};

export const brandName = (props) => {
  return (<Input   {...props} />);
};

export const SkuName = (props) => {
  return (<Input   {...props} />);
};

export const Note = (props) => {
  return (<Input.TextArea   {...props} />);
};

export const Attributes = (props) => {
  const {spuId, onChange, value} = props;

  const [sku, setSku] = useState();

  const {run: spu} = useRequest(spuDetail, {
    manual: true,
    onSuccess: (res) => {
      if (res.sku) {
        setSku(res.sku);
      }
    }
  });

  useEffect(() => {
    if (spuId) {
      spu({
        data: {
          spuId,
        }
      });
    }
  }, [spuId]);

  return (
    <Card bodyStyle={{padding: 0}}>
      <Attribute sku={sku} onChange={(value) => {
        onChange(value);
      }} value={value} />
    </Card>
  );
};

export const Spu = (props) => {

  useEffect(() => {
    if (props.spuId) {
      props.onChange({spuId: props.spuId});
    }
  }, []);

  useEffect(() => {
    if (props.type) {
      props.onChange(null);
    }
  }, [props.type]);
  return (<Select
    width="100%"
    data={{type:1}}
    placeholder="型号"
    disabled={props.spuId}
    api={spuListSelect}
    value={props.value && props.value.spuId}
    onChange={(value) => {
      props.onChange({spuId: value});
    }} />);
};
export const Standard = (props) => {
  return (<Input {...props} />);
};

export const Sku = (props) => {

  useEffect(() => {
    if (!props.type) {
      props.onChange(null);
    }
  }, [props.type]);

  return (<SelectSku value={props.value && props.value.skuId} onChange={(value)=>{
    props.onChange({skuId:value});
  }} />);
};

export const SkuId = (props) => {

  return (<SelectSku {...props} />);
};


