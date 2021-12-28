/**
 * sku表字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React from 'react';
import {
  Input,
  InputNumber,
  Radio, AutoComplete, Checkbox
} from 'antd';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import {useRequest} from '@/util/Request';
import {spuListSelect} from '@/pages/Erp/parts/PartsUrl';
import SpuClassificationList from '@/pages/Erp/spu/components/spuClassification/spuClassificationList';
import {unitListSelect} from '@/pages/Erp/Spus/spuUrl';
import {
  spuClassificationTreeVrew
} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import UnitList from '@/pages/Erp/unit/unitList';
import FileUpload from '@/components/FileUpload';

export const Type = (props) => {

  return (<InputNumber {...props} />);
};

export const SelectSkuName = (props) => {

  return (<Input {...props} />);
};

export const Specifications = (props) => {
  const {skuId, ...other} = props;
  return (<Input disabled={skuId} {...other} />);
};
export const SkuName = (props) => {
  const {model, onChange, skuname, ...other} = props;

  return (
    <>
      <Input {...other} onChange={(value) => {
        onChange(value.target.value);
        typeof model === 'function' && model(value.target.value);
      }} />
      {skuname}
    </>);
};

export const SelectSpu = (props) => {

  return (<Select api={spuListSelect} {...props} />);
};

export const SpuId = (props) => {

  const {data, run} = useRequest(spuListSelect, {
    defaultParams: {
      data: {
        type: 0,
      }
    }
  });


  const options = data && data.map((items) => {
    return {
      label: items.label,
      value: items.label,
      id: items.value,
    };
  });

  return (
    <AutoComplete
      value={props.value && props.value.name ? props.value.name : null}
      options={options || []}
      disabled={props.skuId}
      style={{width: 300}}
      onSelect={(value, option) => {
        typeof props.model === 'function' && props.model(value);
        props.onChange({name: value, spuId: option.id});
      }}
      onChange={async (value) => {
        typeof props.model === 'function' && props.model(value);
        props.onChange({name: value});
        await run(
          {
            data: {
              name: value,
              type: 0,
              spuClassificationId: props.classId,
            }
          }
        );
      }}
      placeholder="输入物料名称"
    />
  );
};

export const Attributes = (props) => {
  return (<Input {...props} />);
};


export const ClassCode = (props) => {
  return (<Input {...props} />);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};
export const UnitId = (props) =>{
  const {skuId, ...other} = props;
  return (<SetSelectOrCascader api={unitListSelect} disabled={skuId} width={200} title='设置单位' component={UnitList} {...other} />);
};

export const Standard = (props) => {
  const {...other} = props;

  return (<Input {...other} />);
};

export const SelectSpuClass = (props) => {
  return (<Cascader api={spuClassificationTreeVrew} {...props} />);
};

export const SpuClass = (props) => {


  const {skuId, ...other} = props;

  return (<SetSelectOrCascader api={spuClassificationTreeVrew} disabled={skuId} cascader width={200} title='设置分类' component={SpuClassificationList} {...other} />);
};

export const Note = (props) => {
  return (<Input.TextArea {...props} />);
};

export const FileId = (props) => {
  return (<FileUpload {...props} />);
};

export const State = (props) => {
  return (<Radio.Group {...props}>
    <Radio value={1}>标配</Radio>
    <Radio value={0}>非标配</Radio>
  </Radio.Group>);
};

export const Batch = (props) => {
  return (<Checkbox checked={props.value} onChange={(value)=>{
    if (value.target.checked){
      props.onChange(1);
    }else {
      props.onChange(0);
    }
  }} />);
};

