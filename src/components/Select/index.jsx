import React from 'react';
import {Select as AntSelect, Button} from 'antd';
import {useRequest} from '@/util/Request';
import {RedoOutlined} from '@ant-design/icons';

const Select = (props) => {
  const {value, api, defaultValue, ...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {loading, data, run} = useRequest(api);

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

  if (data) {
    return (
      <>
        {!loading &&<AntSelect options={data} value={valueArray} {...other}  />}
        <Button loading={loading} className="button-left-margin" icon={<RedoOutlined/>} onClick={() => {
          typeof other.onChange === 'function' && other.onChange('');
          run();
        }}/>
      </>
    );
  } else {
    return null;
  }
};

export default Select;
