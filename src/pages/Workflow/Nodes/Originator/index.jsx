import React, {useEffect, useState} from 'react';
import {Button, message, Modal, Select, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import UserTree from '@/pages/Workflow/Nodes/UserTree';

export const SelectOriginator = ({options, onChange, defaultValue, value, remove}) => {

  const [visiable, setVisiable] = useState();

  const [change, setChange] = useState();

  const [selectValue, setSelectValue] = useState(defaultValue);

  useEffect(() => {
    setSelectValue(defaultValue);
  }, [defaultValue]);

  const type = () => {
    switch (selectValue) {
      case 'users':
        return <Button type="link" onClick={() => {
          setVisiable(true);
        }}>
          {value && value.users ? (value.users.map((items, index) => {
            return items.title;
          })).toString() : '选择'}
        </Button>;
      case 'depts':
        return <Button type="link" onClick={() => {
          setVisiable(true);
        }}>
          {value && value.depts ? (value.depts.map((items, index) => {
            return items.title;
          })).toString() : '选择'}
        </Button>;
      case 'supervisor':
        return null;
      default:
        return <Button type="link" onClick={() => {
          message.error('请选择发起人');
        }}>选择</Button>;
    }
  };

  return <Space>
    <Button
      type="link"
      icon={<DeleteOutlined />}
      onClick={() => {
        typeof remove === 'function' && remove(selectValue);
      }}
      danger
    />
    <Select value={selectValue} placeholder="请选择" options={options} onChange={(value) => {

      setSelectValue(value);
      switch (value) {
        case 'supervisor':
          typeof onChange === 'function' && onChange({supervisor: true});
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


const Originator = ({value, onChange, hidden}) => {

  const [change, setChange] = useState(value);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      [
        {
          label: '指定人',
          value: 'users',
          disabled: change && change.users
        },
        {
          label: '指定部门',
          value: 'depts',
          disabled: change && change.depts
        },
        {
          label: '直接主管',
          value: 'supervisor',
          disabled: change && change.supervisor
        },
      ]
    );
  }, [change]);

  const [count, setCount] = useState(1);

  useEffect(() => {
    const counts = options.filter((value) => {
      return value.disabled;
    });
    setCount(counts.length > 0 ? counts.length : 1);
  }, [options]);

  const selects = (index, value) => {


    return <div key={index} style={{marginBottom: 16}}>
      <SelectOriginator
        options={options}
        defaultValue={value}
        setOptions={(value) => {
          setOptions(value);
        }}
        remove={(value) => {
          if (value) {
            const val = change;
            delete val[value];
            setChange(val);
          }
          setCount(count - 1);
        }}
        value={change}
        onChange={(value) => {
          setChange({...change, ...value});
          hidden && typeof onChange === 'function' && onChange({...change, ...value});
        }} />
    </div>;
  };

  const add = () => {
    const option = [];
    if (change) {
      if (change.users) {
        option.push('users');
      }
      if (change.depts) {
        option.push('depts');
      }
      if (change.supervisor) {
        option.push('supervisor');
      }
    }
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
      array.push(selects(i, option[i]));
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
        <Button type="primary" hidden={hidden} onClick={() => {
          typeof onChange === 'function' && onChange(change);
        }}>保存</Button>
      </Space>
    </div>
  </>;
};

export default Originator;
