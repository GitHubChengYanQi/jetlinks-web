import React from 'react';
import {AutoComplete, Input, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {roleListSelect} from '@/Config/ApiUrl/system/role';
import {isArray} from '@/util/Tools';

const SelectRoles = ({
  value,
  onChange = () => {
  },
  placeholder
}) => {

  const {loading, data} = useRequest(roleListSelect);

  const options = (!loading && data) ? isArray(data).map((value) => {
    return {
      label: value.name,
      value: value.name,
    };
  }) : [];

  return <>
    <AutoComplete filterOption
      dropdownMatchSelectWidth={100}
      notFoundContent={loading && <Spin />}
      options={options}
      value={value}
      onSelect={(value) => {
        onChange(value);
      }}
    >
      <Input
        placeholder={placeholder}
        onChange={(value) => {
          onChange(value.target.value);
        }}
      />
    </AutoComplete>
  </>;
};

export default SelectRoles;
