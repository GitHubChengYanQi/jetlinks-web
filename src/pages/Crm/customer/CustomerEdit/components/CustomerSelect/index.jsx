import React, {useEffect, useState} from 'react';
import {request, useRequest} from '@/util/Request';
import {AutoComplete, Input, Popover, Select, Spin} from 'antd';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';

const CustomerSelect = (props) => {

  const {
    value,
    onChange = () => {
    },
    style,
    onSuccess = () => {
    },
    supply
  } = props;

  const [name, setName] = useState();

  const {loading, data, run} = useRequest({url: '/customer/list?limit=5&page=1', method: 'POST'}, {
    debounceInterval: 300,
  });

  const options = !loading ? data && data.map((value) => {
    return {
      value: value.customerName,
      label: value.customerName,
      id: value.customerId,
    };
  }) : [];

  const defaultValue = async () => {
    const res = await request({
      ...customerDetail,
      data: {
        customerId: value
      }
    });
    if (res) {
      setName(res.customerName);
      onChange(res.customerId);
    }
  };

  useEffect(() => {
    if (value) {
      defaultValue();
    }
  }, [value]);


  return (
    <Select
      value={name}
      notFoundContent={loading && <div style={{textAlign: 'center', padding: 16}}><Spin /></div>}
      placeholder={supply ? '搜索供应商' : '搜索客户'}
      style={style}
      showSearch
      allowClear
      onChange={(value, option) => {
        onSuccess(option.key);
        onChange(option.key);
        setName(value);
      }}
      onSearch={(value) => {
        run({
          data: {
            customerName: value,
            supply
          }
        });
      }}
    >
      {options && options.map((items) => {
        return (
          <Select.Option
            key={items.id}
            title={items.label}
            value={items.value}>
            {items.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default CustomerSelect;
