import React from 'react';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';
import {Select} from 'antd';
import {useRequest} from '@/util/Request';


export const UserId = (props) => {

  const {value,onChange} = props;

  const {data} = useRequest(UserIdSelect);

  return <Select options={data || []} value={typeof value === 'object' ? value.value : value} onSelect={(value, option) => {
    onChange(option);
  }} />;
};
