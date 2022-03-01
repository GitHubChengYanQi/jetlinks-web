import React, {useEffect} from 'react';
import {Select as AntSelect} from 'antd';
import {useRequest} from '@/util/Request';

const Select = (props) => {
  const {
    value,
    api,
    border,
    data: param,
    resh,
    options,
    showArrow,
    placeholder,
    disabled,
    defaultValue,
    onChange = () => {
    },
    width: wid,
    ...other
  } = props;

  const {loading, data, refresh} = useRequest({...api, data: param}, {manual: !api});

  useEffect(() => {
    if (resh) {
      refresh();
    }
  }, [resh]);

  useEffect(() => {
    if (value && data && !param) {
      const items = data && data.filter((items) => {
        return `${items.value}` === `${value}`;
      });
      if (items && items.length <= 0) {
        onChange(null);
      }
    }
  }, [data, value]);

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

  return (
    <>
      {
        !loading
        &&
        <AntSelect
          {...other}
          bordered={border}
          options={options || data && data.map((items) => {
            return {
              label: items.label || items.title,
              value: items.value
            };
          })}
          defaultValue={defaultValue}
          showArrow={showArrow}
          disabled={disabled}
          placeholder={placeholder}
          style={{width: wid}}
          value={valueArray}
          onChange={(value, option) => {
            onChange(value, option);
          }}
          allowClear
          showSearch
          filterOption={(input, option) => option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        />}
    </>
  );
};

export default Select;
