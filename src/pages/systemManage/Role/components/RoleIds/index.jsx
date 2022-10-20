import React from 'react';
import {Checkbox, Select, Space, Tag} from 'antd';
import {useRequest} from '@/util/Request';
import {roleListSelect} from '@/Config/ApiUrl/system/role';
import style from './index.module.less';
import {isObject} from '@/util/Tools';

const RoleIds = ({value = [], onChange, placeholder}) => {

  const {data = []} = useRequest(roleListSelect);

  const options = data.map(item => ({
    label: <Space align="center">
      <Checkbox checked={value.find(id => id === `${item.role_id}`)} />{item.name}
    </Space>,
    name: item.name,
    value: `${item.role_id}`
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
      popupClassName={style.select}
      placeholder={placeholder || '请选择角色'}
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

export default RoleIds;
