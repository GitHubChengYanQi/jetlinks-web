import React, {useState} from 'react';
import {Select} from 'antd';
import {useRequest} from '@/util/Request';
import * as querystring from 'querystring';

const {Option} = Select;

const Select2 = (props) => {
  const [value, setValue] = useState(' ');

  const {data, run} = useRequest({url: props.url, method: 'POST',data: {customerName: value}}, {
    debounceInterval: 300,
  });

  const handleSearch = async value => {
    if (value) {
      setValue(value);
      await run();
    }
  };

  const handleChange = value => {
    setValue(value);
  };

  const options = data ? data.map((values) => {
    return (
      <Option key={values.customerName}>{values.customerName}</Option>
    );
  }) : null;

  props.onChange(value);


  return (
    <Select
      showSearch
      value={value}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default Select2;
