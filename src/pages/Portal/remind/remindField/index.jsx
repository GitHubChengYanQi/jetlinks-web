/**
 * 提醒表字段配置页
 *
 * @author cheng
 * @Date 2021-08-26 15:50:39
 */

import React, {useEffect} from 'react';
import {Input, Tag, Select as AntSelect} from 'antd';
import {useRequest} from '@/util/Request';
import {userIdSelect} from '../remindUrl';

export const Type = (props) => {
  return (<Input {...props} />);
};
export const UserId = (props) => {

  const userIds = [];

  const {data} = useRequest(userIdSelect);

  const options = data || [];

  function tagRender(props) {
    const {label, value, closable, onClose} = props;
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
  }

  return (
    <AntSelect
      mode="multiple"
      showArrow
      // defaultValue={userIds}
      tagRender={tagRender}
      style={{width: '100%'}}
      options={options}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};
