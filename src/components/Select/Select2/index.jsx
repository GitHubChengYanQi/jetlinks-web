import React, {useState} from 'react';
import {Select as AntSelect, Button} from 'antd';
import {RedoOutlined} from '@ant-design/icons';
import {Option} from 'antd/lib/mentions';
import {useRequest} from '@/util/Request';

const Select2 = (props) => {
  const {api, defaultValue,onChange, ...other} = props;

  const [values, setValues] = useState(props.value);

  const {data, run} = useRequest({url: '/items/list', method: 'POST', data: {name: values}}, {
    debounceInterval: 300,
    manual: true,
  });

  let value;

  if (data !== undefined) {
    value = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
      value[i] = {value: data[i].name, lable: data[i].name};
    }
  }


  let [open,setOpen] = useState(false);


    if (value!==undefined) {
      if (value.length > 0 && open != null) {
        open = true;
      } else {
        open = false;
      }
    }


  return (
    <>
      <AntSelect
        onSearch={(value) => {
          if (value !== '') {
            setValues(value);
            setOpen(false);
          }
          run();
        }}
        open={open}
        onChange={(value) => {
          setOpen(null);
          setValues(value);
        }}
        onBlur={()=>{
          onChange(values);
        }}
        options={value}
        style={{width: 300}}
        value={values}
        allowClear
        showSearch
      />
    </>
  );
};

export default Select2;
