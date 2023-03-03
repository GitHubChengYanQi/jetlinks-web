import {Checkbox, Select, Space, Spin, Tag, Transfer} from 'antd';
import React, {useState} from 'react';
import {useRequest} from '@/util/Request';
import {alarmContactFindAll} from '@/pages/alarm/ContactGroup/url';
import {isObject} from '@/util/Tools';

const ContactGroupTransfer = ({
  value,
  onChange = () => {
  }
}) => {
  const [data, setData] = useState([]);

  const {loading} = useRequest(
    alarmContactFindAll,
    {
      onSuccess: (res) => {
        const alarmContacts = res || [];
        setData(alarmContacts.map(item => ({value: item.groupId, label: item.name})));
      }
    }
  );

  if (loading) {
    return <Spin spinning/>;
  }

  const options = data.map(item => ({
    label: <Space align="center">
      <Checkbox checked={value.find(id => id === `${item.value}`)} />{item.label}
    </Space>,
    name: item.label,
    value: `${item.value}`
  }));

  const tagRender = (props) => {
    const {value, closable, onClose} = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="green"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {isObject(options.find(item => item.value === value)).name}
      </Tag>
    );
  };


  return (
    <Select
      maxTagCount={3}
      placeholder='请选择报警组'
      mode="multiple"
      showArrow
      allowClear
      showSearch
      value={Array.isArray(value) ? value : []}
      tagRender={tagRender}
      style={{width: '100%'}}
      options={options}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
};
export default ContactGroupTransfer;
