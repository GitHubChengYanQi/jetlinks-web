/**
 * 付款模板字段配置页
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React from 'react';
import {Input, InputNumber, Radio, Select as AntSelect} from 'antd';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import TemplateList from '@/pages/Crm/template/TemplateList';
import {templateListSelect} from '@/pages/Crm/template/TemplateUrl';
import Editor from '@/components/Editor';

export const Name = (props) => {
  return (<Input placeholder="请输入付款计划模板名称" {...props} />);
};
export const OftenUser = (props) => {
  return (<Radio.Group {...props}>
    <Radio value={1}>是</Radio>
    <Radio value={0}>否</Radio>
  </Radio.Group>);
};
export const Pid = (props) => {
  return (<Input {...props} />);
};
export const Remark = (props) => {
  return (<Input.TextArea rows={4} placeholder="请输入付款计划模板备注" {...props} />);
};

export const PayType = (props) => {
  return (<AntSelect
    style={{width: 120}}
    options={[{
      label: '订单创建后',
      value: 0,
    }, {
      label: '合同签订后',
      value: 1,
    }, {
      label: '订单发货前',
      value: 2,
    }, {
      label: '订单发货后',
      value: 3,
    }, {
      label: '入库后',
      value: 4,
    }]}
    {...props}
  />);
};


export const Percentum = (props) => {
  return (<InputNumber min={1} max={100} style={{width: 80}} {...props} />);
};

export const TemplateId = (props) => {
  return (
    <SetSelectOrCascader component={TemplateList} api={templateListSelect} title="添加合同模板" width={200} {...props} />);
};

export const Freight = (props) => {
  return (<Radio.Group {...props}><Radio value="是">是</Radio><Radio value="否">否</Radio></Radio.Group>);
};
export const PayMethod = (props) => {
  return (<Input placeholder="请输入 现金/承兑/电汇" {...props} />);
};

export const DateWay = (props) => {
  return (<AntSelect
    options={[{
      label: '天',
      value: 0,
    }, {
      label: '月',
      value: 1,
    }, {
      label: '年',
      value: 2,
    }]}
    {...props}
  />);
};

export const dateNumber = (props) => {
  return (<InputNumber min={1} {...props} />);
};

export const DeliveryWay = (props) => {
  return (<Input placeholder="请输入交货方式" {...props} />);
};
export const Note = (props) => {
  return (<Editor {...props} />);
};

