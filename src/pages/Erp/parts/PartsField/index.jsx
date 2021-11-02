/**
 * 清单字段配置页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../PartsUrl';
import {spuListSelect} from '../PartsUrl';
import SelectSpu from '@/pages/Erp/spu/components/SelectSpu';
import {useRequest} from '@/util/Request';
import Attribute from '@/pages/Erp/instock/components/Attribute';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuAttribute from '@/pages/Erp/instock/components/SpuAttribute';

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

export const Attributes = (props) => {
  const {spuId, ...other} = props;

  const [sku, setSku] = useState();

  const {run} = useRequest(spuDetail, {
    manual: true,
    onSuccess: (res) => {
      if (res.sku) {
        setSku(res.sku);
      }
    }
  });

  useEffect(() => {
    if (spuId) {
      run({
        data: {
          spuId,
        }
      });
    }
  }, [spuId]);
  return (
    <>
      <SpuAttribute sku={sku} {...other} />
    </>
  );
};

export const Spu = (props) => {
  useEffect(() => {
    if (props.type){
      props.onChange(null);
    }

  }, [props.type]);
  return (<Select width={200} placeholder="spu" api={spuListSelect}   {...props} />);
};
export const Sku = (props) => {

  useEffect(() => {
    props.onChange(null);
  }, [props.type]);

  const {data} = useRequest({url: '/sku/list', method: 'POST'});
  const options = data && data.map((items) => {
    return {
      label: <>
        {items.spuResult && items.spuResult.name}
        &nbsp;&nbsp;
        (
        {
          items.skuJsons
          &&
          items.skuJsons.map((item, index) => {
            if (index === items.skuJsons.length - 1) {
              return <em key={index}>
                {item.attribute && item.attribute.attribute}：{item.values && item.values.attributeValues}
              </em>;
            } else {
              return <em key={index}>
                {item.attribute && item.attribute.attribute}：{item.values && item.values.attributeValues}，
              </em>;
            }
          })
        }
        )
      </>,
      value: items.skuId,
    };
  });
  return (<AntdSelect placeholder="sku" options={options || []}   {...props} />);
};

