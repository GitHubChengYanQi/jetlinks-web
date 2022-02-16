/**
 * 工位表字段配置页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React from 'react';
import {Input, Select as AntdSelect, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {userIdSelect} from '@/pages/Portal/remind/remindUrl';

export const Name = (props) => {
  return (<Input {...props} />);
};

export const CreateUser = (props) => {
  return (<Input {...props} />);
};

export const UserIds = (props) => {
  const {loading, data} = useRequest(userIdSelect);

  const value = props.value && props.value.map((item) => {
    return `${item}`;
  });

  if (loading) {
    return <Spin />;
  }

  return (<AntdSelect
    options={data}
    mode="multiple"
    allowClear
    style={{width: '100%'}}
    {...props}
    value={value}
    filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  />);
};
