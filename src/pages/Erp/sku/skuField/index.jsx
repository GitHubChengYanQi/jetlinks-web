/**
 * sku表字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect} from 'react';
import {
  Input, Radio, AutoComplete, Spin,
} from 'antd';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import {useRequest} from '@/util/Request';
import {spuListSelect} from '@/pages/Erp/parts/PartsUrl';
import {unitListSelect} from '@/pages/Erp/Spus/spuUrl';
import {
  spuClassificationTreeVrew
} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import FileUpload from '@/components/FileUpload';
import SkuConfiguration from '@/pages/Erp/sku/components/SkuConfiguration';
import store from '@/store';
import InputNumber from '@/components/InputNumber';
import SpuClassificationEdit from '@/pages/Erp/spu/components/spuClassification/spuClassificationEdit';
import UnitEdit from '@/pages/Erp/unit/unitEdit';

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

  const {classId, value, onChange} = props;

  const {loading, data, run} = useRequest(spuListSelect, {manual: true});

  const action = (name) => {
    if (name || classId) {
      run({
        data: {
          name, spuClassificationId: classId,
        }
      });
    }
  };

  useEffect(() => {
    action(value && value.name);
  }, [classId]);


  const options = (!classId || loading) ? [] : data && data.map((items) => {
    return {
      label: items.label, value: items.label, id: items.value,
    };
  });

  return (<AutoComplete
      value={value && value.name ? value.name : null}
      notFoundContent={loading && <Spin/>}
      options={options || []}
      // disabled={skuId}
      style={{width: 300}}
      onSelect={(value, option) => {
        onChange({name: value, spuId: option.id});
      }}
      onChange={async (value) => {
        onChange({name: value});
        action(value);
      }}
      placeholder="请输入物料名称"
    />);
};

export const Attributes = (props) => {
  return (<Input {...props} />);
};


export const ClassCode = (props) => {
  return (<Input {...props} />);
};


export const SkuName = (props) => {
  return (<Input {...props} />);
};

export const Codings = (props) => {
  useEffect(() => {
    if (props.copy) {
      props.onChange(null);
    }
  }, []);
  return (<Coding {...props} />);
};
export const UnitId = (props) => {
  return (<SetSelectOrCascader api={unitListSelect} width={200} title="设置单位" component={UnitEdit} {...props} />);
};

export const Standard = (props) => {
  const {...other} = props;

  return (<Input {...other} />);
};

export const SelectSpuClass = (props) => {
  return (<Cascader api={spuClassificationTreeVrew} width={200}  {...props} />);
};

export const SpuClass = (props) => {

  const [state] = store.useModel('dataSource');

  const {...other} = props;

  return (<SetSelectOrCascader
    options={state.skuClass}
    moduleType="cascader"
    width={200}
    title="新增分类"
    type={1}
    component={SpuClassificationEdit}
    changeOnSelect={false}
    {...other}
  />);
};

export const Note = (props) => {
  return (<Input.TextArea {...props} />);
};

export const AddMethod = (props) => {
  return (<Input {...props} />);
};

export const Specs = (props) => {
  return (<Input {...props} />);
};

export const FileId = (props) => {
  return (<FileUpload {...props} maxCount={1}/>);
};

export const Img = (props) => {
  return (<div style={{maxWidth: 300}}>
    <FileUpload {...props} maxCount={1} title="物料图片"/>
  </div>);
};

export const Bind = (props) => {
  return (<div style={{maxWidth: 300}}>
    <FileUpload {...props} maxCount={1} title="关联图纸"/>
  </div>);
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
      一批一码
    </Radio>
    <Radio value={0}>
      一件一码
    </Radio>
  </Radio.Group>);
};

