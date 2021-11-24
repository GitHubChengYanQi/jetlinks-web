/**
 * 质检方案字段配置页
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {useEffect, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Space, Popover} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../qualityPlanUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import FileUpload from '@/pages/Crm/data/components/FileUpload';
import CheckButton from '@/components/CheckButton';
import UpLoadImg from '@/components/Upload';
import {qualityCheckClassificationListSelect} from '@/pages/Erp/qualityCheck/qualityCheckUrl';
import {useRequest} from '@/util/Request';
import {qualityCheckListSelect} from '../qualityPlanUrl';
import {spuListSelect} from '@/pages/Erp/productOrder/productOrderUrl';
import {spuClassificationListSelect, unitListSelect} from '@/pages/Erp/spu/spuUrl';


export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding width={400} codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};

export const PlanName = (props) => {
  return (<Input style={{width: 400}} {...props} />);
};

export const Name = (props) => {
  return (<Input {...props} />);
};
export const PlanStatus = (props) => {
  return (<Input {...props} />);
};
export const PlanType = (props) => {
  return (<Radio.Group {...props}><Radio value="1">生产检</Radio><Radio value="2">巡检</Radio></Radio.Group>);
};
export const AttentionPlease = (props) => {
  return (<Input.TextArea style={{width: 400}} {...props} />);
};
export const PlanAdjunct = (props) => {
  return (<FileUpload {...props} />);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};

export const QualityCheckClass = (props) => {
  return (<Select api={qualityCheckClassificationListSelect} {...props} />);
};


export const QualityAmount = (props) => {
  return (<InputNumber {...props} />);
};

export const TestingType = (props) => {
  return (<Radio.Group {...props}>
    <Radio value="1">抽检检查</Radio>
    <Radio value="2">固定检查</Radio>
  </Radio.Group>);
};


export const StandardValue = (props) => {
  const {type, typeClass, active, ...other} = props;

  useEffect(() => {
    if (active && other.value) {
      other.onChange(null);
    }
  }, [type]);

  const placeholder = '标准值';

  const types = (bai) => {
    if (typeClass === 6) {
      return <>
        <InputNumber style={{width: bai ? 71 : 88}} value={other.value && `${other.value}`.split(',')[0]} min={0} max={bai && 100} onChange={(val) => {
          other.onChange(`${val},${other.value ? other.value.split(',')[1] : ''}`);
        }} />{bai && '  %'}
        &nbsp;——&nbsp;
        <InputNumber style={{width: bai ? 71 : 88}} value={other.value && `${other.value}`.split(',')[1]} max={bai && 100} onChange={(val) => {
          other.onChange(`${other.value ? other.value.split(',')[0] : ''},${val}`);
        }} />{bai && '  %'}
      </>;
    } else {
      return <><InputNumber style={{width: bai ? 186 : 200}} min={0} max={bai && 100} placeholder={placeholder} {...other} />{bai && '  %'}</> ;
    }
  };

  switch (type) {
    case 1:
      return types();
    case 2:
    case 3:
    case 4:
    case 6:
    case 7:
      return null;
    case 5:
      return types(true);
    default:
      return <Input style={{width: 200}} placeholder={placeholder} {...other} />;
  }
};

export const Yes = (props) => {
  const {value, onChange} = props;
  return (<Checkbox.Group
    options={[{label: '必填', value: '1'}]}
    style={{marginLeft: 8}} value={[`${value}`]}
    onChange={(checkedValue) => {
      onChange(checkedValue[0] || 0);
    }} />);
};


export const QualityCheckId = (props) => {

  const {type, onChange, value, ...other} = props;


  const {data, run} = useRequest(qualityCheckListSelect);

  const [qualityCheckClass, setQualityCheckClass] = useState();

  useEffect(() => {
    run({
      data: {
        qualityCheckClassificationId: qualityCheckClass
      }
    });
  }, [qualityCheckClass]);

  const content = (
    <Space direction="vertical">
      <Space>
        <div>
          质检分类：
          <Select
            api={qualityCheckClassificationListSelect}
            width={200}
            value={qualityCheckClass}
            onChange={(value) => {
              setQualityCheckClass(value);
            }} />
        </div>
        <div>
          选择质检项：
          <AntdSelect
            options={data || []}
            style={{width: 200}}
            {...props}
            allowClear
            showSearch
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => {
              onChange(value);
            }} />
        </div>
      </Space>
    </Space>
  );

  const types = () => {
    switch (type) {
      case 1:
        return <Input disabled value="数值" />;
      case 2:
        return <Input disabled value="文本" />;
      case 3:
        return <Input disabled value="是否" />;
      case 4:
        return <Input disabled value="图片" />;
      case 5:
        return <Input disabled value="百分比" />;
      case 6:
        return <Input disabled value="视频" />;
      case 7:
        return <Input disabled value="附件" />;
      default:
        return <Input disabled value="" />;
    }
  };

  return (
    <Space>
      <Popover placement="bottomLeft" content={content} trigger="click">
        <AntdSelect
          options={data || []}
          open={false}
          style={{width: 130}}
          {...props} />
      </Popover>
      {types()}
    </Space>);
};

export const Operator = (props) => {

  const options = [
    {label: '=', value: 1},
    {label: '>=', value: 2},
    {label: '<=', value: 3},
    {label: '>', value: 4},
    {label: '<', value: 5},
    {label: '<>', value: 6},
  ];

  return (<AntdSelect
    placeholder="运算符"
    style={{width: 100, marginRight: 8}}
    bordered={false}
    options={options} {...props} />);
};


export const Sort = (props) => {
  return <Input {...props} />;
};

export const UnitId = (props) => {
  return <Select placeholder='单位' api={unitListSelect} {...props} />;
};
