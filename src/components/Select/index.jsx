import React, {useEffect} from 'react';
import {Select as AntSelect, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';

const Select = (
  {
    value,
    api,
    style,
    border,
    data: param = {},
    resh,
    options,
    showArrow,
    placeholder,
    disabled,
    defaultValue,
    onChange = () => {
    },
    onSearch = () => {
    },
    format = (data) => {
      return data;
    },
    width,
    ...other
  }
) => {
  const {loading, data, refresh} = useRequest({...api, data: param}, {manual: !api});

  const selectOptions = loading ? [] : (format(isArray(data)) || []);

  useEffect(() => {
    if (resh) {
      refresh();
    }
  }, [resh]);

  useEffect(() => {
    if (value && selectOptions.length > 0) {
      const items = selectOptions.find((items) => {
        return `${items.value}` === `${value}`;
      });
      if (!items) {
        onChange(null);
      }
    }
  }, [selectOptions, value]);

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

  return loading
    ?
    <Spin />
    :
    <AntSelect
      // open
      {...other}
      listHeight={200}
      bordered={border}
      options={options || selectOptions.map((items) => {
        return {
          label: items.label || items.title,
          value: items.value
        };
      })}
      defaultValue={defaultValue}
      showArrow={showArrow}
      disabled={disabled}
      placeholder={placeholder}
      style={{width: width || '100%',...style}}
      value={valueArray}
      onChange={(value, option) => {
        onChange(value, option);
      }}
      onSearch={onSearch}
      allowClear
      showSearch
      filterOption={(input, option) => {
        if (typeof option.label !== 'string') {
          return true;
        }
        return option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
    />;
};

export default Select;
