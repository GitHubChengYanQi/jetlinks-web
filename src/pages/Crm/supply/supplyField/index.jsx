/**
 * 供应商供应物料字段配置页
 *
 * @author song
 * @Date 2021-12-20 10:08:44
 */

import React, {useEffect} from 'react';
import {
  Input,
  Spin,
  Tag,
  Select as AntSelect
} from 'antd';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {useRequest} from '@/util/Request';
import {supplyListSelect} from '../supplyUrl';
import {brandListSelect} from '@/pages/Erp/brand/BrandUrl';

export const SkuId = (props) => {
  const {customerId, ...other} = props;
  const {loading, data, run} = useRequest(supplyListSelect, {manual: true});
  useEffect(() => {
    run({
      data: {
        customerId,
      }
    });
  }, []);

  if (loading)
    return <Spin />;

  const skuIds = [];
  if (data)
    data.map((items) => {
      return skuIds.push(items.label);
    });

  return (<SelectSku {...other} width='100%' skuIds={skuIds} />);
};
export const CustomerId = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};

export const BrandId = (props) => {

  const {value,displays} = props;


  const brandBindResults = [];

  if (value && value.length > 0){
    if (typeof value[0] === 'object'){
      value.forEach((items)=>{
        brandBindResults.push(items && `${items.brandId}`);
      });
    }else {
      value.forEach((items)=>{
        brandBindResults.push(items);
      });
    }
  }

  useEffect(()=>{
    if (brandBindResults.length > 0){
      props.onChange(brandBindResults);
    }
  },[]);


  const {data} = useRequest(brandListSelect);

  const options = data || [];

  const tagRender = (props) => {
    const {label, closable, onClose} = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="green"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {label}
      </Tag>
    );
  };


  return (
    <AntSelect
      mode="multiple"
      showArrow
      value={brandBindResults}
      tagRender={tagRender}
      style={{width: '100%',display:displays || null}}
      options={options}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};
