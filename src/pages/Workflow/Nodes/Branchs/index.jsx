import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Select, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';

const Branchs = ({value, onChange}) => {

  const config = (array) => {
    return [
      {
        label: '采购数量',
        value: 'number',
        disabled: array.filter((value) => {
          return value.type === 'number';
        }).length > 0
      },
      {
        label: '采购种类',
        value: 'type_number',
        disabled: array.filter((value) => {
          return value.type === 'type_number';
        }).length > 0
      },
      {
        label: '总金额',
        value: 'money',
        disabled: array.filter((value) => {
          return value.type === 'money';
        }).length > 0
      },
    ];
  };

  const [change, setChange] = useState(value || []);

  const [options, setOptions] = useState(config(value || []));

  const [count, setCount] = useState(1);

  const refreshConfig = (array) => {
    setOptions(config(array));
  };


  useEffect(() => {
    const counts = options && options.filter((value) => {
      return value.disabled;
    });
    setCount(counts && counts.length > 0 ? counts.length : 1);
  }, []);

  const selects = (index, value) => {

    return <Space key={index} style={{marginBottom: 16}}>
      <Select
        style={{minWidth: 100}}
        placeholder="采购条件类型"
        value={value && value.type}
        options={options}
        onChange={(value) => {
          const array = change;
          array[index] = {...array[index],type: value, };
          setChange(array);
          refreshConfig(change);
        }}
      />
      <Select
        style={{minWidth: 100}}
        placeholder="运算符"
        value={value && value.purchaseAsk && value.purchaseAsk.operator}
        options={[
          {label: '>', value: '>',},
          {label: '>=', value: '>=',},
          {label: '<', value: '<',},
          {label: '<=', value: '<=',},
          {label: '===', value: '===',},
        ]}
        onChange={(value) => {
          const array = change;
          array[index] = {...array[index], purchaseAsk: {...array[index] && array[index].purchaseAsk,operator: value},};
          setChange(array);
          refreshConfig(change);
        }} />
      <InputNumber
        style={{minWidth: 100}}
        value={value && value.purchaseAsk && value.purchaseAsk.value}
        placeholder="值"
        onChange={(value) => {
          const array = change;
          array[index] = {...array[index], purchaseAsk: {...array[index] && array[index].purchaseAsk, value},};
          setChange(array);
          refreshConfig(change);
        }}
      />
      <Button
        type="link"
        disabled={count === 1}
        icon={<DeleteOutlined />}
        onClick={() => {
          change.splice(index, 1);
          refreshConfig(change);
          setCount(count - 1);
        }}
        danger
      />
    </Space>;
  };

  const add = () => {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
      array.push(selects(i, change[i]));
    }
    return <Space direction="vertical">{array}</Space>;
  };

  return <>
    {add()}
    <div style={{marginTop: 16}}>
      <Space>
        <Button type="dashed" disabled={count === options.length} onClick={() => {
          setCount(count + 1);
        }}><PlusOutlined />增加</Button>
        <Button type="primary" onClick={() => {
          typeof onChange === 'function' && onChange(change);
        }}>保存</Button>
      </Space>
    </div>
  </>;
};
export default Branchs;
