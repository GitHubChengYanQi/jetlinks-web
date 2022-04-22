import React, {useEffect, useState} from 'react';
import {Select, Spin} from 'antd';
import {request, useRequest} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';

const CustomerSelect = (props) => {

  const {
    value,
    placeholder,
    dataParams,
    onChange = () => {
    },
    style,
    onSuccess = () => {
    },
    supply
  } = props;

  const [name, setName] = useState();

  const {loading, data, run} = useRequest({url: '/customer/list?limit=5&page=1', method: 'POST',data:{...dataParams,supply}}, {
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
      placeholder={placeholder}
      style={style}
      showSearch
      allowClear
      onChange={(value, option) => {
        onSuccess(option && option.key);
        onChange(option && option.key);
        setName(value);
      }}
      onSearch={(value) => {
        run({
          data: {
            customerName: value,
            supply,
            ...dataParams
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
