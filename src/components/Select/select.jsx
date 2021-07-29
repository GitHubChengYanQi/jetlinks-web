import React, {useState} from 'react';
import {Select as AntSelect, Button} from 'antd';
import {useRequest} from '@/util/Request';
import {RedoOutlined} from '@ant-design/icons';
import {Option} from 'antd/lib/mentions';

const Select2 = (props) => {
  const {api, defaultValue, ...other} = props;


  let valueArray = [];
  const {mode} = other;
  if (props.value) {
    if (!Array.isArray(props.value)) {
      if (mode === 'multiple' || mode === 'tag') {
        const tmpValue = props.value.split(',');
        for (let i = 0; i < tmpValue.length; i++) {
          const item = tmpValue[i];
          if (item) {
            valueArray.push(item);
          }
        }
      } else {
        const tmpValue = props.value.split(',');
        valueArray = tmpValue[0] || [];
      }
    } else {
      valueArray = props.value;
    }
  } else if (mode !== 'multiple' && mode !== 'tag') {
    valueArray = '';
  }

  const [values, setValues] = useState();
  const {loading, data, run} = useRequest({url: '/items/list', method: 'POST', data: {name: values}}, {
    debounceInterval: 700,
    manual: true,
  });

  let value;
  if (data !== undefined) {
    value = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
      value[i] = {value: data[i].name, lable: data[i].name};
    }
  }

  const [open,setOpen] = useState(false);

  // if (value!==undefined){
  //   if (value.length>0){
  //     setOpen(true);
  //   }else {}
  // }





  props.onChange(values);


  return (
    <>
      {!loading &&
      <AntSelect
        onSearch={(value) => {
          if (value !== '') {
            setValues(value);
          }
          run();
        }}
        open={open}
        onChange={(value) => {
          setOpen(false);
          setValues(value);
        }}
        options={value}
        style={{width: 200}}
        value={values}
        allowClear
        showSearch
      />}
    </>
  );
};

export default Select2;
