/**
 * 客户级别表字段配置页
 *
 * @author
 * @Date 2021-07-30 13:00:02
 */

import React from 'react';
import {Input, Select as AntdSelect, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {customerLevelIdSelect} from '../crmCustomerLevelUrl';

export const CustomerLevelId = (props) => {
  return (<Input {...props} />);
};
export const Level = (props) => {
  return (<Input {...props} />);
};
export const Rank = (props) => {
  const {loading, data} = useRequest(customerLevelIdSelect);
  if (loading)
    return <Spin />;
  const ranks = [];
  if (data) {
    data.map((items) => {
      return ranks.push(items.rank);
    });
  }

  const disabled = (value) => {
    return ranks.filter((item) => {
      return item === `${value}`;
    }).length > 0;
  };
  const option = [
    {
      label: 0, value: 0, disabled: disabled(0)
    },
    {
      label: 1, value: 1, disabled: disabled(1)
    },
    {
      label: 2, value: 2, disabled: disabled(2)
    },
    {
      label: 3, value: 3, disabled: disabled(3)
    },
    {
      label: 4, value: 4, disabled: disabled(4)
    },
    {
      label: 5, value: 5, disabled: disabled(5)
    },
  ];
  return (<AntdSelect options={option} {...props} />);
};
