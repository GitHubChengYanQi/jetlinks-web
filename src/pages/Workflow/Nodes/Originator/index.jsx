import React, {useEffect, useRef, useState} from 'react';
import {Button, message, Select, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import UserTree from '@/pages/Workflow/Nodes/UserTree';
import Modal from '@/components/Modal';

export const SelectOriginator = (
  {
    options,
    count,
    index,
    onChange = () => {
    },
    defaultValue,
    value,
    remove = () => {
    }
  }) => {

  const ref = useRef();

  const [change, setChange] = useState();

  const [selectValue, setSelectValue] = useState(defaultValue);

  useEffect(() => {
    setSelectValue(defaultValue);
  }, [defaultValue]);


  const type = () => {
    switch (selectValue) {
      case 'AppointUsers':
        return <Button type="link" onClick={() => {
          ref.current.open(true);
        }}>
          {value[index] && value[index].appointUsers && value[index].appointUsers.length > 0 ? (value[index].appointUsers.map((items) => {
            return items.title;
          })).toString() : '选择'}
        </Button>;
      case 'DeptPositions':
        return <Button type="link" onClick={() => {
          ref.current.open(true);
        }}>
          {value[index] && value[index].deptPositions && value[index].deptPositions.length > 0 ? (value[index].deptPositions.map((items) => {
            return `${items.title}(${items.positions && items.positions.map((items) => {
              return items.label;
            })})`;
          })).toString() : '选择'}
        </Button>;
      case 'AllPeople':
        return null;
      case 'MasterDocumentPromoter':
        return null;
      case 'Director':
        return null;
      default:
        return <Button type="link" onClick={() => {
          message.warn('请选择发起人');
        }}>选择</Button>;
    }
  };

  return <Space>
    <Select style={{minWidth: 100}} value={selectValue} placeholder="请选择" options={options} onChange={(value) => {
      setSelectValue(value);
      switch (value) {
        case 'AppointUsers':
          onChange({type: value, appointUsers: []});
          break;
        case 'DeptPositions':
          onChange({type: value, deptPositions: []});
          break;
        case 'AllPeople':
          onChange({type: value});
          break;
        case 'MasterDocumentPromoter':
          onChange({type: value});
          break;
        case 'Director':
          onChange({type: value});
          break;
        default:
          break;
      }
    }}
    />
    <Button
      type="link"
      disabled={count === 1}
      icon={<DeleteOutlined />}
      onClick={() => {
        remove(selectValue);
      }}
      danger
    />
    {type()}
    <Modal
      ref={ref}
      width={600}
      footer={
        <Button type="primary" onClick={() => {
          onChange({type: selectValue, ...change});
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

  const config = (array) => {
    return [
      {
        label: '指定人',
        value: 'AppointUsers',
        disabled: array.filter((value) => {
          return value.type === 'AppointUsers';
        }).length > 0
      },
      {
        label: '部门+职位',
        value: 'DeptPositions',
        disabled: array.filter((value) => {
          return value.type === 'DeptPositions';
        }).length > 0
      },
      {
        label: '所有人',
        value: 'AllPeople',
        disabled: array.filter((value) => {
          return value.type === 'AllPeople';
        }).length > 0
      }, {
        label: '主单据发起人',
        value: 'MasterDocumentPromoter',
        disabled: array.filter((value) => {
          return value.type === 'MasterDocumentPromoter';
        }).length > 0
      }, {
        label: '单据负责人',
        value: 'Director',
        disabled: array.filter((value) => {
          return value.type === 'Director';
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
    return <div key={index} style={{marginBottom: 16}}>
      <SelectOriginator
        options={options}
        count={count}
        index={index}
        defaultValue={value}
        remove={(value) => {
          if (value) {
            change.splice(index, 1);
            refreshConfig(change);
            hidden && typeof onChange === 'function' && onChange(change);
          }
          setCount(count - 1);
        }}
        value={change}
        onChange={(value) => {
          const array = change;
          array[index] = value;
          setChange(array);
          refreshConfig(change);
          hidden && typeof onChange === 'function' && onChange(change);
        }} />
    </div>;
  };

  const add = () => {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
      array.push(selects(i, change[i] && change[i].type));
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
          refreshConfig(change);
          typeof onChange === 'function' && onChange(change);
        }}>保存</Button>
      </Space>
    </div>
  </>;
};

export default Originator;
