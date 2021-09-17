import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {AutoComplete, Input, Popover} from 'antd';

const CustomerSelect = (props) => {


  const {value, onChange, style, method, onblur,disabled,onSuccess, ...other} = props;

  const {data, run} = useRequest({url: '/customer/list', method: 'POST'}, {
    debounceInterval: 300,
    manual: true,
  });



  const handleChange = async value => {
    if (value) {
      onChange(value);
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


  const content = data ? data.map((value, index) => {
    return {
      value:value.customerId,
      label: value.customerName
    };
  }) : [];


  return ((
    <>
      <AutoComplete
        dropdownMatchSelectWidth={100}
        options={content}
        style={style}
        value={value && value.customerName}
        onSelect={(value)=>{
          onSuccess(value);
        }}
      >
        <Input.Search
          onBlur={()=>{
            typeof onblur === 'function' && onblur();
          }}
          onChange={(value) => {
            handleChange(value.target.value);
          }}
        />
      </AutoComplete>
    </>));
};

export default CustomerSelect;
