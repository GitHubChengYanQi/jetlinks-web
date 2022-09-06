import React, {useEffect} from 'react';
import {Select as AntSelect, Spin} from 'antd';
import {useRequest} from '@/util/Request';

const Select = (
  {
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
    onSearch = () => {
    },
    format = (data) => {
      return data;
    },
    width: wid,
    ...other
  }
) => {

  const {loading, data, refresh} = useRequest({...api, data: param}, {manual: !api});

  const selectOptions = format(data) || [];

  useEffect(() => {
    if (resh) {
      refresh();
    }
  }, [resh]);

  useEffect(() => {
    if (value && selectOptions && !param) {
      const items = selectOptions.filter((items) => {
        return `${items.value}` === `${value}`;
      });
      if (items && items.length <= 0) {
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

  return (
    <div id="select" style={{width: wid || '100%'}}>
      {
        loading
          ?
          <Spin/>
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
            style={{width: '100%'}}
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
          />}
    </div>
  );
};

export default Select;
