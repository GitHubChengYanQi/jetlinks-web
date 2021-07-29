import React, {useState} from 'react';
import {Select as AntSelect, Button} from 'antd';
import {useRequest} from '@/util/Request';
import {RedoOutlined} from '@ant-design/icons';
import {Option} from 'antd/lib/mentions';

const Select2 = (props) => {
  const {value,api, defaultValue, ...other} = props;

  const {loading, data,mutate, run} = useRequest(api);

  let valueArray = [];
  const {mode} = other;
  if (value) {
    if (!Array.isArray(value)) {
      if (mode === 'multiple' || mode === 'tag') {
        const tmpValue = value.split(',');
        for (let i = 0; i < tmpValue.length; i++) {
          const item = tmpValue[i];
          if (item) {
            valueArray.push(item);
          }
        }
      } else {
        const tmpValue = value.split(',');
        valueArray = tmpValue[0] || [];
      }
    } else {
      valueArray = value;
    }
  } else if (mode !== 'multiple' && mode !== 'tag') {
    valueArray = '';
  }

  const [values, setValues] = useState(valueArray);


  if (data) {
    return (
      <>
        {!loading &&
        <AntSelect
          onSearch={(value) => {
            if (value !== '') {
              setValues(value);
            };
          }}
          onChange={values}
          options={data}
          allowClear={false}
          style={{width: 200}}
          value={values}
          {...other}
          showSearch
          // filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        />}
      </>
    );
  } else {
    return null;
  }
};

export default Select2;
