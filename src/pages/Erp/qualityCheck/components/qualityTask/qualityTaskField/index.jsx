/**
 * 质检任务字段配置页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React, {useEffect} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../qualityTaskUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import {userIdSelect} from '@/pages/Portal/remind/remindUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {brandIdSelect} from '@/pages/Erp/instock/InstockUrl';
import {qualityPlanList, qualityPlanListSelect} from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanUrl';
import {useBoolean} from 'ahooks';

export const Time = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Select api={userIdSelect} {...props}/>);
};
export const Remark = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber min={1} {...props}/>);
};

export const BrandId = (props) =>{
  return (<Select api={brandIdSelect} {...props}/>);
};

export const QualityPlanId = (props) =>{
  const {type,...other} = props;
  useEffect(()=>{
    if (type !== undefined){
      other.onChange(null);
    }
  },[type]);
  return (<Select resh={type} api={qualityPlanListSelect} placeholder={type === 1 ? '抽检检查' : '固定检查' } data={{testingType:type}}  {...other}/>);
};

export const State = (props) =>{
  return (<Radio.Group {...props}>
    <Radio.Button value={-1}>已拒绝</Radio.Button>
    <Radio.Button value={0}>待分派</Radio.Button>
    <Radio.Button value={1}>已分派</Radio.Button>
    <Radio.Button value={2}>已完成</Radio.Button>
    <Radio.Button value={3}>已入库</Radio.Button>
  </Radio.Group>);
};

export const Batch = (props) =>{
  return (<Checkbox checked={props.value} onChange={(value)=>{
    if (value.target.checked){
      props.onChange(1);
    }else {
      props.onChange(0);
    }
  }}>批量</Checkbox>);
};

export const Type = (props) =>{
  return (<AntdSelect options={[{label:'入厂',value:'入厂'},{label:'出厂',value:'出厂'},]} {...props}/>);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};

export const SkuId = (props) => {
  return (<SelectSku {...props} dropdownMatchSelectWidth={400} />);
};


export const Remaining = (props) => {
  return (<><InputNumber min={1} max={100} placeholder='抽检(%)' {...props}/>&nbsp;&nbsp;%</>);
};
