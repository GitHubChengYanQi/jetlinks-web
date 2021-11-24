import React, {useRef, useState} from 'react';
import {Button, message, Modal, Select, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import UserTree from '@/pages/Workflow/Nodes/UserTree';

export const SelectOriginator = ({options, setOptions,defaultValue, onChange, value}) => {

  const [visiable, setVisiable] = useState();

  const [change, setChange] = useState();

  const [selectValue, setSelectValue] = useState();

  const type = () => {
    switch (selectValue) {
      case 'users':
        return <Button type="link" onClick={() => {
          setVisiable(true);
        }}>
          {value && value.users ? value.users.map((items, index) => {
            return <span key={index}>{items.title},</span>;
          }) : '选择'}
        </Button>;
      case 'depts':
        return <Button type="link" onClick={() => {
          setVisiable(true);
        }}>
          {value && value.depts ? value.depts.map((items, index) => {
            return <span key={index}>{items.title},</span>;
          }) : '选择'}
        </Button>;
      default:
        return <Button type="link" onClick={() => {
          message.error('请选择发起人');
        }}>选择</Button>;
    }
  };

  return <Space>
    <Select value={selectValue} placeholder="请选择" options={options} onChange={(value) => {
      setSelectValue(value);
      const change = options.filter((values) => {
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
    {type()}
    <Modal
      visible={visiable}
      onCancel={() => {
        setVisiable(false);
      }}
      onOk={() => {
        typeof onChange === 'function' && onChange(change);
        setVisiable(false);
      }}>
      <UserTree type={selectValue} value={value} onChange={(value) => {
        setChange(value);
      }} />
    </Modal>
  </Space>;
};

const Originator = ({value, onChange}) => {

  const [change, setChange] = useState(value);

  const [options, setOptions] = useState([
    {
      label: '指定人',
      value: 'users',
      disabled:value && value.users
    },
    {
      label: '指定部门',
      value: 'depts',
      disabled:value && value.depts
    }
  ]);

  const [count, setCount] = useState(1);

  const selects = (index) => {
    return <div key={index} style={{marginBottom: 16}}>
      <SelectOriginator
        defaultValue={value}
        options={options}
        setOptions={(value) => {
          setOptions(value);
        }}
        value={change}
        onChange={(value) => {
          setChange({...change, ...value});
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
        }}><PlusOutlined />增加</Button>
        <Button type="primary" onClick={() => {
          typeof onChange === 'function' && onChange(change);
        }}>保存</Button>
      </Space>
    </div>
  </>;
};

export default Originator;
