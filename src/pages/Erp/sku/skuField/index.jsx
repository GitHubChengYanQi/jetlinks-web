/**
 * sku表字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useRef} from 'react';
import {
  Input,
  InputNumber,
  Radio, AutoComplete, Spin, Space, Select as AntdSelect, Button
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
import SkuConfiguration from '@/pages/Erp/sku/components/SkuConfiguration';
import Modal from '@/components/Modal';
import SpuTable from '@/pages/Erp/spu/components/spuClassification/spuTable';

export const Type = (props) => {

  return (<InputNumber {...props} />);
};

export const SelectSkuName = (props) => {

  return (<Input {...props} />);
};

export const Specifications = (props) => {
  return (<SkuConfiguration {...props} />);
};

export const SelectSpu = (props) => {

  return (<Select api={spuListSelect} {...props} />);
};


export const SpuId = (props) => {

  const {classId, value, onChange, skuId} = props;

  const {loading, data, run} = useRequest(spuListSelect);

  const action = (name) => {
    run({
      data: {
        name,
        spuClassificationId: classId,
      }
    });
  };

  useEffect(() => {
    action(value && value.name);
  }, [classId]);


  const options = !classId || loading ? [] : data && data.map((items) => {
    return {
      label: items.label,
      value: items.label,
      id: items.value,
    };
  });

  return (
    <AutoComplete
      value={value && value.name ? value.name : null}
      notFoundContent={loading && <Spin />}
      options={options || []}
      disabled={skuId}
      style={{width: 300}}
      onSelect={(value, option) => {
        onChange({name: value, spuId: option.id});
      }}
      onChange={async (value) => {
        onChange({name: value});
        action(value);
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
export const UnitId = (props) => {
  const {...other} = props;
  return (<SetSelectOrCascader api={unitListSelect} width={200} title="设置单位" component={UnitList} {...other} />);
};

export const Standard = (props) => {
  const {...other} = props;

  return (<Input {...other} />);
};

export const SelectSpuClass = (props) => {
  return (<Cascader api={spuClassificationTreeVrew} {...props} />);
};

export const SpuClass = (props) => {


  const {...other} = props;

  return (<SetSelectOrCascader
    api={spuClassificationTreeVrew}
    cascader
    width={200}
    title="设置分类"
    component={SpuClassificationList} {...other} />);
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
  return (<Radio.Group {...props}>
    <Radio value={1}>
      是
    </Radio>
    <Radio value={0}>
      否
    </Radio>
  </Radio.Group>);
};

