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
import {useRequest} from '@/util/Request';
import Attribute from '@/pages/Erp/instock/components/Attribute';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuAttribute from '@/pages/Erp/instock/components/SpuAttribute';
import {skuDetail, skuList} from '@/pages/Erp/sku/skuUrl';
import Modal from '@/components/Modal';

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
    <Card bodyStyle={{padding:0}}>
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
    placeholder="产品"
    disabled={props.spuId}
    api={spuListSelect}
    value={props.value && props.value.spuId}
    onChange={(value) => {
      props.onChange({spuId: value});
    }} />);
};

export const Sku = (props) => {

  useEffect(() => {
    if (!props.type) {
      props.onChange(null);
    }
  }, [props.type]);


  const {loading,data,run} = useRequest({...skuList,data:{type:0}},{debounceInterval:500});

  const options = data && data.map((items) => {
    let values = '';
    items.skuJsons && items.skuJsons.map((item, index) => {
      if (index === items.skuJsons.length - 1) {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}` : '';
      } else {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}，` : '';
      }
    });
    return {
      label: items.spuResult && `${items.skuName} / ${items.spuResult.name}  ${(values === '' ? '' : `( ${values} )`)}`,
      value: items.skuId,
    };
  });


  return (<AntdSelect
    placeholder="物料"
    showSearch
    loading={loading}
    style={{width: '100%'}}
    // value={props.value && props.value.skuId}
    onSearch={(value)=>{
      run({
        data:{
          skuName:value,
          type:0
        }
      });
    }}
    onChange={(value,option) => {
      props.onChange({skuId: option.children[1].props.children});
    }} >
    {options && options.map((items,index)=>{
      return (
        <AntSelect.Option key={index} value={items.label}>{items.label}<div style={{display:'none'}}>{items.value}</div></AntSelect.Option>
      );
    })}
  </AntdSelect>);
};

export const SkuId = (props) => {

  const {loading,data,run} = useRequest({...skuList,data:{type:0}},{debounceInterval:500});


  const options = data && data.map((items) => {
    let values = '';
    items.skuJsons && items.skuJsons.map((item, index) => {
      if (index === items.skuJsons.length - 1) {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}` : '';
      } else {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}，` : '';
      }
    });
    return {
      label: items.spuResult && `${items.skuName} / ${items.spuResult.name}  ${(values === '' ? '' : `( ${values} )`)}`,
      value: items.skuId,
    };
  });


  return (<AntdSelect
    placeholder="物料"
    showSearch
    loading={loading}
    style={{width: '100%'}}
    // value={props.value && props.value.skuId}
    onSearch={(value)=>{
      run({
        data:{
          skuName:value,
          type:0
        }
      });
    }}
    onChange={(value,option) => {
      props.onChange(option.children[1].props.children);
    }} >
    {options && options.map((items,index)=>{
      return (
        <AntSelect.Option key={index} value={items.label}>{items.label}<div style={{display:'none'}}>{items.value}</div></AntSelect.Option>
      );
    })}
  </AntdSelect>);
};


