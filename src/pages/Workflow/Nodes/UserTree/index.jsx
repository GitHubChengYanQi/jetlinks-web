import React, {useState} from 'react';
import {Button, Col, Radio, Row, Space, Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';

const UserTree = ({type, value, onChange}) => {

  const {loading, data} = useRequest(UserIdSelect);


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

  switch (type) {
    case 'users':
      return <>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={check.users && check.users.map((items, index) => {
            return items.key;
          })}
          onCheck={(value, option) => {
            const users = option.checkedNodes.filter((value)=>{
              return value.key !== 0;
            });
            setCheck({users});
            typeof onChange === 'function' && onChange({users});
          }}
          treeData={[{title: '全选', key: 0, children: treeData || []}]}
        />
      </>;
    case 'depts':
      return <Tree
        checkable
        defaultExpandAll
        checkedKeys={check.depts && check.depts.map((items, index) => {
          return items.key;
        })}
        onCheck={(value, option) => {
          const depts = option.checkedNodes.filter((value)=>{
            return value.key !== '0';
          });
          setCheck({depts});
          typeof onChange === 'function' && onChange({depts});
        }}
        treeData={depts || []}
      />;
    default:
      return null;
  }
};

export default UserTree;
