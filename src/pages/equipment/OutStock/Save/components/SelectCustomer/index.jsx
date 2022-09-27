import React from 'react';
import {Select, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {customerList} from '@/pages/systemManage/Tenant/url';

const SelectCustomer = ({
  onChange = () => {
  }
}) => {

  const params = {limit: 10, page: 1};

  const {loading, data, run} = useRequest({...customerList, params});

  const options = (!loading && data) ? data.map((item) => {
    return {
      label: item.name,
      value: item.customerId,
    };
  }) : [];

  return <Select
    allowClear
    placeholder="请选择所属客户"
    style={{width: '100%'}}
    showSearch
    filterOption={false}
    notFoundContent={loading && <div style={{textAlign: 'center'}}><Spin/></div>}
    options={options}
    onSearch={(string) => {
      run({
        data: {
          name: string,
        },
        params
      });
    }}
    onChange={(value) => {
      onChange(value);
    }}
  />;
};

export default SelectCustomer;
