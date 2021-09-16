import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {AutoComplete, Input, Popover} from 'antd';

const CustomerSelect = (props) => {


  const {value: values, onChange, style, method, onblur,disabled,onSuccess, ...other} = props;
  const [val, setVal] = useState();


  const {data, run} = useRequest({url: '/customer/list', method: 'POST'}, {
    debounceInterval: 300,
    manual: true,
  });

  useEffect(() => {
    setVal(values);
  }, [values]);


  const handleChange = async value => {
    if (value) {
      setVal(value);
      onChange(value);
      await run({
        data: {
          customerName: value
        }
      });
    } else {
      setVal(value);
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
        value={val}
        onSelect={(value)=>{
          onSuccess(value);
          // setVal(values);
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
