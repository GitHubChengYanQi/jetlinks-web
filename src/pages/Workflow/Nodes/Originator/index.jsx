import React, {useEffect, useRef, useState} from 'react';
import {Button, message, Select, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import UserTree from '@/pages/Workflow/Nodes/UserTree';
import Modal from '@/components/Modal';

export const SelectOriginator = ({options, count, index, onChange, defaultValue, value, remove}) => {

  const ref = useRef();

  const [change, setChange] = useState();

  const [selectValue, setSelectValue] = useState(defaultValue);

  useEffect(() => {
    setSelectValue(defaultValue);
  }, [defaultValue]);


  const type = () => {
    switch (selectValue) {
      case 'users':
        return <Button type="link" onClick={() => {
          ref.current.open(true);
        }}>
          {value[index] && value[index].users && value[index].users.length > 0 ? (value[index].users.map((items) => {
            return items.title;
          })).toString() : '选择'}
        </Button>;
      case 'depts':
        return <Button type="link" onClick={() => {
          ref.current.open(true);
        }}>
          {value[index] && value[index].depts && value[index].depts.length > 0 ? (value[index].depts.map((items) => {
            return `${items.title}(${items.positions && items.positions.map((items) => {
              return items.label;
            })})`;
          })).toString() : '选择'}
        </Button>;
      case 'perform':
        return null;
      default:
        return <Button type="link" onClick={() => {
          message.warn('请选择发起人');
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
          typeof onChange === 'function' && onChange({name: value, users: []});
          break;
        case 'depts':
          typeof onChange === 'function' && onChange({name: value, depts: []});
          break;
        case 'perform':
          typeof onChange === 'function' && onChange({name: value, perform: false});
          break;
        default:
          break;
      }
    }}
    />
    {type()}
    <Modal
      ref={ref}
      width={600}
      footer={
        <Button type="primary" onClick={() => {
          typeof onChange === 'function' && onChange({name: selectValue, ...change});
          ref.current.close();
        }}>
          保存
        </Button>
      }>
      <div style={{padding: 16}}>
        <UserTree type={selectValue} value={value[index]} onChange={(value) => {
          setChange(value);
        }} />
      </div>
    </Modal>
  </Space>;
};


const Originator = ({value, onChange, hidden}) => {

  const config = (value) => {
    return [
      {
        label: '指定人',
        value: 'users',
        disabled: value && value.users && value.users.length > 0
      },
      {
        label: '部门+职位',
        value: 'depts',
        disabled: value && value.depts && value.depts.length > 0
      },
      {
        label: '所有人',
        value: 'perform',
        disabled: value && value.perform
      },
    ];
  };

  const [change, setChange] = useState([]);

  const [options, setOptions] = useState(config(value));

  const [count, setCount] = useState(1);

  const config1 = (array) => {

    const users = array.filter((value) => {
      return value.users;
    });

    const depts = array.filter((value) => {
      return value.depts;
    });

    const perform = array.filter((value) => {
      return value.perform;
    });

    setOptions([
      {
        label: '指定人',
        value: 'users',
        disabled: users.length > 0
      },
      {
        label: '部门+职位',
        value: 'depts',
        disabled: depts.length > 0
      }, {
        label: '所有人',
        value: 'perform',
        disabled: perform.length > 0
      },
    ]);

    return {
      users: users.length > 0 ? users[0].users : [],
      depts: depts.length > 0 ? depts[0].depts : [],
      perform:perform.length > 0 ? perform[0].perform : false,
    };
  };


  useEffect(() => {

    const array = [];
    if (value && value.users && value.users.length > 0) {
      array.push({users: value.users, name: 'users'});
    }
    if (value && value.depts && value.depts.length > 0) {
      array.push({depts: value.depts, name: 'depts'});
    }
    if (value && value.perform) {
      array.push({perform: value.perform, name: 'perform'});
    }

    setChange(array);

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
        index={index}
        defaultValue={value}
        remove={(value) => {
          if (value) {
            change.splice(index, 1);
            const backValue = config1(change);
            hidden && typeof onChange === 'function' && onChange(backValue);
          }
          setCount(count - 1);
        }}
        value={change}
        onChange={(value) => {
          const array = change;
          array[index] = value;
          setChange(array);
          const backValue = config1(array);
          hidden && typeof onChange === 'function' && onChange(backValue);
        }} />
    </div>;
  };

  const add = () => {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
      array.push(selects(i, change[i] && change[i].name));
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
          const backValue = config1(change);
          typeof onChange === 'function' && onChange(backValue);
        }}>保存</Button>
      </Space>
    </div>
  </>;
};

export default Originator;
