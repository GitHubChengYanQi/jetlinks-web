import React, {useRef, useState} from 'react';
import {Button, Select, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import UserTree from '@/pages/Workflow/Nodes/UserTree';

export const SelectOriginator = ({options, setOptions}) => {

  const ref = useRef();
  const [value,setValue] = useState('');

  return <Space>
    <Select placeholder="请选择" options={options} onChange={(value) => {
      setValue(value);
      const change = options.filter((values)=>{
        return value !== values.value;
      });
      switch (value) {
        case 'users':
          setOptions([
            ...change,
            {
              label: '指定人',
              value: 'users',
              disabled: true,
            },
          ]);
          break;
        case 'depts':
          setOptions([
            ...change,
            {
              label: '指定部门',
              value: 'depts',
              disabled: true,
            }
          ]);
          break;
        default:
          break;
      }
    }}
    />
    <Button type="link" onChange={()=>{

    }}>选择</Button>
    <Modal ref={ref} />
  </Space>;
};

const Originator = ({value, onChange}) => {

  const [options, setOptions] = useState([
    {
      label: '指定人',
      value: 'users',
    },
    {
      label: '指定部门',
      value: 'depts',
    }
  ]);

  const [count, setCount] = useState(1);

  const selects = (index) => {
    return <div key={index} style={{marginBottom: 16}}>
      <SelectOriginator options={options} setOptions={(value)=>{
        setOptions(value);
      }} />
    </div>;
  };

  const add = () => {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
      array.push(selects(i));
    }
    return array;
  };


  return <>
    {add()}
    <div style={{marginTop: 16}}>
      <Space>
        <Button type="dashed" disabled={count === options.length} onClick={() => {
          setCount(count + 1);
        }}><PlusOutlined />增加</Button> <Button type="primary">保存</Button>
      </Space>
    </div>
  </>;
};

export default Originator;
