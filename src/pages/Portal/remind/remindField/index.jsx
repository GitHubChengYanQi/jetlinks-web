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
  return (<AntSelect style={{width:200}}  options={[{label:'新的报修',value:0},{label:'派工提醒',value:1},{label:'到达提醒',value:2},{label:'完成提醒',value:3},{label:'评价提醒',value:4},]} {...props} />);
};
export const UserId = (props) => {

  const {value} = props;

  const userIds = [];




  // eslint-disable-next-line no-nested-ternary
  value.length > 0 ? typeof(value[0])==='object' ? value.forEach((items)=>{
    userIds.push(items && `${items.userId}`);
  }) : value.forEach((items)=>{
    userIds.push(items);
  }) : [];




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
      value={userIds}
      tagRender={tagRender}
      style={{width: '100%'}}
      options={options}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};
