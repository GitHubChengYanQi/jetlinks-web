import React, {useState} from 'react';
import {Select, Space} from 'antd';
import {isArray} from '@/util/Tools';

const Fileds = (
  {
    array = [],
    show,
    onChange = () => {
    },
    value = [],
  }
) => {

  const [data, setData] = useState([...array]);

  return <Space>
    {
      data.map((item, index) => {
        const options = isArray(item);
        return <Select
          showSearch
          key={index}
          placeholder="请选择"
          style={{width: 200}}
          filterOption={(input, option) => {
            if (typeof option.label !== 'string') {
              return true;
            }
            return option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }}
          bordered={!show}
          open={show ? false : undefined}
          suffixIcon={show && null}
          value={value[index]}
          options={options.map(item => {
            return {...item, label: item.title, value: item.key};
          })}
          onChange={(field, option) => {
            const newData = data.filter((dataItem, dataIndex) => dataIndex <= index);
            if (isArray(option.children).length > 0) {
              setData([...newData, option.children]);
            } else {
              setData([...newData]);
            }

            const filedValue = new Array(index + 1).fill('').map((filedValueItem, filedValueIndex) => {
              if (index === filedValueIndex) {
                return field;
              } else {
                return value[filedValueIndex];
              }
            });
            console.log(option);
            onChange(filedValue,option);
          }} />;
      })
    }
  </Space>;
};

export default Fileds;
