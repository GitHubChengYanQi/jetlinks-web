import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {AutoComplete, Input, Popover} from 'antd';

const CustomerSelect = (props) => {


  const {value, onChange, style, method, onblur, disabled, onSuccess, ...other} = props;

  const {data, run} = useRequest({url: '/customer/list', method: 'POST'}, {
    debounceInterval: 300,
    manual: true,
  });


  const handleChange = async value => {
    onChange(value);
    if (value) {
      await run({
        data: {
          customerName: value
        }
      });
    } else {
      await run({
        data: {
          customerName: ' '
        }
      });
    }

  };


  const content = data ? data.map((value) => {
    return {
      value: value.customerName,
      label: <span>{value.customerName}</span>
    };
  }) : [];


  return (
    <AutoComplete
      dropdownMatchSelectWidth={100}
      options={content}
      placeholder='选择客户'
      style={style}
      value={value}
      onSelect={(value) => {
        onSuccess(data.find((item)=>{
          return item.customerName === value;
        }));
      }}
    >
      <Input.Search
        onBlur={() => {
          typeof onblur === 'function' && onblur();
        }}
        onFocus={async (value)=>{
          if (value.target.value) {
            await run({
              data: {
                customerName: value
              }
            });
          } else {
            await run({
              params: {
                limit: 5,
                page:1
              }
            });
          }
        }}
        onChange={(value) => {
          handleChange(value.target.value);
        }}
      />
    </AutoComplete>
  );
};

export default CustomerSelect;
