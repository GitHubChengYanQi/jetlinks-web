/**
 * 导航表字段配置页
 *
 * @author
 * @Date 2021-08-18 08:40:30
 */

import React from 'react';
import {AutoComplete, Input, Select as AntSelect, InputNumber} from 'antd';
import Select from '@/components/Select';
import UpLoadImg from '@/components/Upload';
import Links from '@/pages/Portal/Links';
import * as apiUrl from '../navigationUrl';
import {useRequest} from '@/util/Request';

export const Title = (props) => {
  return (<Input {...props} />);
};
export const Icon = (props) => {
  return (<UpLoadImg {...props} />);
};
export const Sort = (props) => {
  return (<InputNumber min={0} {...props} />);
};
export const Link = (props) => {
  return (<Links {...props} />);
};
export const Difference = (props) => {
  return (<Select api={apiUrl.Difference} {...props} />);
};

export const Class = (props) => {
  return (<Select api={apiUrl.dataClassificationSelect} {...props} />);
};
export const Content = (props) => {

  const {onChange,value,...other} = props;

  const {loading,data, run} = useRequest({url: '/data/listSelect', method: 'GET'}, {manual: true,});

  return (<>
    <AntSelect
      loading={loading}
      allowClear
      showSearch
      onSelect={(value, option)=>{
        onChange(option.children[1].props.children);
      }}
      onSearch={(value)=>{
        run({
          params:{
            name:value || 'null',
            content:value || 'null'
          }
        });
      }}
    >
      {data && data.map((items,index)=>{
        return (
          <AntSelect.Option key={index} value={items.label}>{items.label}<div style={{display:'none'}}>{items.value}</div></AntSelect.Option>
        );
      })}
    </AntSelect>
  </>);
};

