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

  return (<Attribute show sku={sku} onChange={(value) => {
    console.log(value);
    onChange(value);
  }} attributes={value} />);
};

export const Spu = (props) => {
  useEffect(() => {
    if (props.type) {
      props.onChange(null);
    }

  }, [props.type]);
  return (<Select
    width="100%"
    placeholder="产品"
    api={spuListSelect}
    value={props.value && props.value.spuId}
    onChange={(value) => {
      props.onChange({spuId: value});
    }} />);
};
export const Sku = (props) => {

  useEffect(() => {
    // props.onChange(null);
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

  return (<AntdSelect
    placeholder="物料"
    style={{width: '100%'}}
    options={options || []}
    value={props.value && props.value.skuId}
    onChange={(value) => {
      props.onChange({skuId: value});
    }} />);
};

export const SkuId = (props) => {
  const {data} = useRequest(skuList);

  const options = data && data.map((items) => {
    let values = '';
    items.skuJsons && items.skuJsons.map((item, index) => {
      if (index === items.skuJsons.length - 1) {
        return values += `${item.attribute && item.attribute.attribute}:${item.values && item.values.attributeValues}`;
      } else {
        return values += `${item.attribute && item.attribute.attribute}:${item.values && item.values.attributeValues}，`;
      }
    });

    return {
      label: items.spuResult && `${items.spuResult.name} / ${items.skuName}  (${values})`,
      value: items.skuId,
    };
  });
  return (
    <>
      <AntdSelect
        placeholder="输入型号"
        dropdownMatchSelectWidth={500}
        options={options || []}
        allowClear
        showSearch
        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        {...props}
      />
    </>
  );
};


