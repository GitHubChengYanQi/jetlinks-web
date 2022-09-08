import React from 'react';
import {Select, Spin} from 'antd';
import {deviceList} from '@/pages/equipment/Equipment/url';
import {useRequest} from '@/util/Request';

const SelectDevice = ({
  onChange = () => {
  }
}) => {

  const params = {limit: 10, page: 1};

  const {loading, data, run} = useRequest({...deviceList, params});

  const options = (!loading && data) ? data.map((item) => {
    return {
      label: item.mac,
      value: item.deviceId,
    };
  }) : [];

  return <Select
    allowClear
    placeholder="请选择设备MAC"
    style={{width: 200}}
    showSearch
    filterOption={false}
    notFoundContent={loading && <div style={{textAlign: 'center'}}><Spin/></div>}
    options={options}
    onSearch={(string) => {
      run({
        data: {
          mac: string,
        },
        params
      });
    }}
    onChange={(value) => {
      onChange(value);
    }}
  />;
};

export default SelectDevice;
