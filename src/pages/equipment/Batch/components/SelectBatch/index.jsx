import React, {useEffect} from 'react';
import {Select, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {deviceBatchList} from '@/pages/equipment/Batch/url';

const SelectBatch = ({
  value,
  onChange = () => {
  },
  modelId,
  categoryId,
}) => {

  const params = {limit: 10, page: 1};

  const defaultData = {modelId, categoryId, status: 1};

  const {loading, data, run} = useRequest({...deviceBatchList, params}, {manual: true});

  useEffect(() => {
    run({data: {...defaultData}});
  }, [modelId, categoryId]);

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
    notFoundContent={loading && <div style={{textAlign: 'center'}}><Spin /></div>}
    options={options}
    onSearch={(string) => {
      run({
        data: {
          coding: string,
          ...defaultData
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
