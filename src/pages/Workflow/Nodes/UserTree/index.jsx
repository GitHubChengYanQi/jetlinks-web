import React, {useState} from 'react';
import {Button, Col, Radio, Row, Space, Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';

const UserTree = ({value, onChange}) => {

  const {loading, data} = useRequest(UserIdSelect);

  const [select, setSelect] = useState(0);

  const {loading: deptLoading, data: depts} = useRequest({
    url: '/rest/dept/tree',
    method: 'POST',
  });


  const [check, setCheck] = useState(value || {});

  const treeData = data && data.map((item) => {
    return {
      title: item.label,
      key: item.value,
    };
  });

  if (loading || deptLoading) {
    return null;
  }

  return <>
    <Radio.Group value={select} style={{margin:16}} onChange={(value) => {
      setSelect(value.target.value);
    }}>
      <Radio.Button value={0}>人员</Radio.Button>
      <Radio.Button value={1}>部门</Radio.Button>
    </Radio.Group>
    {!select ?
      <Tree
        checkable
        defaultExpandAll
        checkedKeys={check.users && check.users.map((items, index) => {
          return items.key;
        })}
        onCheck={(value, option) => {
          setCheck({users: option.checkedNodes});
        }}
        treeData={[{title: '全选', key: 0, children: treeData || []}]}
      />
      :
      <Tree
        checkable
        defaultExpandAll
        checkedKeys={check.depts && check.depts.map((items, index) => {
          return items.key;
        })}
        onCheck={(value, option) => {
          setCheck({depts: option.checkedNodes});
        }}
        treeData={depts || []}
      />}
    <div style={{margin: 16, textAlign: 'center'}}>
      <Space>
        <Button type="primary" onClick={() => {
          typeof onChange === 'function' && onChange(check);
        }}>确定</Button>
        <Button type="default" onClick={() => {

        }}>清空</Button>
      </Space>
    </div>
  </>;
};

export default UserTree;
