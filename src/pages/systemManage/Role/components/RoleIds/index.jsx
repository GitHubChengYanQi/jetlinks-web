import React from 'react';
import {Select, Tag} from 'antd';
import {useRequest} from '@/util/Request';
import {roleListSelect} from '@/Config/ApiUrl/system/role';

const RoleIds = ({value, onChange, placeholder}) => {

  const {data = []} = useRequest(roleListSelect);

  const options = data.map(item => ({label: item.name, value: `${item.role_id}`}));

  const tagRender = (props) => {
    const {label, closable, onClose} = props;
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
        {label}
      </Tag>
    );
  };


  return (
    <Select
      placeholder={placeholder || '请选择角色'}
      mode="multiple"
      showArrow
      allowClear
      showSearch
      filterOption={(input, option) => option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
