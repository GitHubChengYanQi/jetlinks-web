import React, {useEffect, useState} from 'react';
import {Button, message, Modal, Select, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import UserTree from '@/pages/Workflow/Nodes/UserTree';

export const SelectOriginator = ({options,count, onChange, defaultValue, value, remove}) => {

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
          {value && value.users && value.users.length > 0 ? (value.users.map((items, index) => {
            return items.title;
          })).toString() : '选择'}
        </Button>;
      case 'depts':
        return <Button type="link" onClick={() => {
          setVisiable(true);
        }}>
          {value && value.depts && value.depts.length > 0 ? (value.depts.map((items, index) => {
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
      disabled={count === 1}
      icon={<DeleteOutlined />}
      onClick={() => {
        typeof remove === 'function' && remove(selectValue);
      }}
      danger
    />
    <Select value={selectValue} placeholder="请选择" options={options} onChange={(value) => {
      setSelectValue(value);
      switch (value) {
        case 'users':
          typeof onChange === 'function' && onChange({users: []});
          break;
        case 'depts':
          typeof onChange === 'function' && onChange({depts: []});
          break;
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

  const config = (value) =>{
    return  [
      {
        label: '指定人',
        value: 'users',
        disabled: value && value.users
      },
      {
        label: '指定部门',
        value: 'depts',
        disabled: value && value.depts
      },
      {
        label: '直接主管',
        value: 'supervisor',
        disabled: value && value.supervisor
      },
    ];
  };

  const [change, setChange] = useState(value);

  const [options, setOptions] = useState(config(value));

  const [count, setCount] = useState(1);

  useEffect(() => {
    setOptions(config(change));
  }, [change,count]);



  useEffect(() => {
    const counts = options && options.filter((value) => {
      return value.disabled;
    });
    setCount(counts && counts.length > 0 ? counts.length : 1);
  }, []);

  const selects = (index, value) => {
    return <div key={index} style={{marginBottom: 16}}>
      <SelectOriginator
        options={options}
        count={count}
        defaultValue={value}
        remove={(value) => {
          if (value) {
            const val = change;
            delete val[value];
            setChange(val);
            hidden && typeof onChange === 'function' && onChange(val);
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
          const disabledCount = options.filter((value)=>{
            return value.disabled;
          });
          if (disabledCount.length === count){
            setCount(count + 1);
          }else {
            message.warn('请先选择！');
          }
        }}><PlusOutlined />增加</Button>
        <Button type="primary" hidden={hidden} onClick={() => {
          typeof onChange === 'function' && onChange(change);
        }}>保存</Button>
      </Space>
    </div>
  </>;
};

export default Originator;
