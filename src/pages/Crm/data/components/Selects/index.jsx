import React, {useEffect} from 'react';
import {useRequest} from '@/util/Request';
import {Select as AntSelect} from 'antd';


const Selects = ({value,onChange,api}) => {


  const array = [];

  if (value && value.length > 0) {
    if (typeof value[0] === 'object') {
      value.forEach((items) => {
        array.push(items && `${items.itemId}`);
      });
    } else {
      value.forEach((items) => {
        array.push(items);
      });
    }
  }


  useEffect(() => {
    if (value) {
      onChange(array);
    }
  }, []);


  const {data} = useRequest(api);

  const options = data || [];

  return (
    <AntSelect
      mode="multiple"
      showArrow
      style={{width: '100%'}}
      options={options}
      value={array}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
};

export default Selects;
