import React, {useEffect} from 'react';
import {Select, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {firmwareList} from '@/pages/equipment/Firmware/url';

const SelectFirmware = ({
  value,
  onChange = () => {
  },
  modelId,
  categoryId,
}) => {

  const params = {limit: 10, page: 1};

  const defaultData = {modelId, categoryId,status:'1'};

  const {loading, data, run} = useRequest({...firmwareList, params}, {manual: true});

  useEffect(() => {
    run({data: {...defaultData}});
  }, [modelId, categoryId]);

  const options = (!loading && data) ? data.map((item) => {
    return {
      label: item.version,
      value: item.firmwarId,
    };
  }) : [];

  return <Select
    allowClear
    value={value}
    placeholder="请选择版本"
    style={{width: '100%'}}
    showSearch
    filterOption={false}
    notFoundContent={loading && <div style={{textAlign: 'center'}}><Spin /></div>}
    options={options}
    onSearch={(string) => {
      run({
        data: {
          version: string,
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

export default SelectFirmware;
