import React from 'react';
import {Select, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {deviceBatchList} from '@/pages/equipment/Batch/url';

const SelectBatch = ({
  value,
  onChange = () => {
  }
}) => {

  const params = {limit: 10, page: 1};

  const {loading, data, run} = useRequest({...deviceBatchList, params, data: {coding: value}});

  const options = (!loading && data) ? data.map((item) => {
    return {
      label: item.coding,
      value: item.batchId,
    };
  }) : [];

  return <Select
    allowClear
    value={value}
    placeholder="请选择批次"
    style={{width: '100%'}}
    showSearch
    filterOption={false}
    notFoundContent={loading && <div style={{textAlign: 'center'}}><Spin/></div>}
    options={options}
    onSearch={(string) => {
      run({
        data: {
          coding: string,
        },
        params
      });
    }}
    onChange={(value) => {
      onChange(value);
    }}
  />;
};

export default SelectBatch;
