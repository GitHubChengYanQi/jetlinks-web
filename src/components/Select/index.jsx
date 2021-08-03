import React from 'react';
import {Select as AntSelect, Button} from 'antd';
import {useRequest} from '@/util/Request';

const Select = (props) => {


  const {value, values,api, defaultValue,width, data: da, handleSearch, handleChange,onChange ,...other} = props;

  const {loading, data, run} = useRequest(api, {
    manual: !!da
  });


  let valueArray = [];
  const {mode} = other;

  if (value) {
    if (!Array.isArray(value)) {
      if (mode === 'multiple' || mode === 'tag') {
        const tmpValue = `${value}`.split(',');
        for (let i = 0; i < tmpValue.length; i++) {
          const item = tmpValue[i];
          if (item) {
            valueArray.push(item);
          }
        }
      } else {
        const tmpValue = `${value}`.split(',');
        valueArray = tmpValue[0] || [];
      }
    } else {
      valueArray = value;
    }
  } else if (mode !== 'multiple' && mode !== 'tag') {
    valueArray = '';
  }

  if (values){
    props.onChange(values);
  }else if (value){
    props.onChange(valueArray);
  }

  return (
    <>
      {!loading &&
      <AntSelect
        options={da || data}
        value={valueArray || values}
        {...other}
      />}
    </>
  );
};

export default Select;
