import React, {useEffect} from 'react';
import {Select as AntSelect} from 'antd';
import {useRequest} from '@/util/Request';

const Select = (props) => {
  const {value, api,border,data:param,resh,showArrow,placeholder,disabled,defaultValue, width:wid ,...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {loading, data, refresh} = useRequest({...api,data:param});

  useEffect(()=>{
    if (resh){
      refresh();
    }
  },[resh]);

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
    valueArray = null;
  }


  if (data) {
    return (
      <>
        {!loading &&<AntSelect bordered={border} options={data} defaultValue={defaultValue} showArrow={showArrow} disabled={disabled}  placeholder={placeholder} style={{ width: wid }} value={valueArray} {...other} allowClear showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        />}
      </>
    );
  } else {
    return null;
  }
};

export default Select;
