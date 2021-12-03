import React, {useEffect, useState} from 'react';
import {Select,  Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';

const UserTree = ({type, value, onChange}) => {

  const {loading, data} = useRequest(UserIdSelect);


  const {loading: deptLoading, data: depts} = useRequest({
    url: '/rest/dept/tree',
    method: 'POST',
  });

  const {loading: positionLoading, data: positions} = useRequest({
    url: '/position/listSelect',
    method: 'POST',
  });


  const [check, setCheck] = useState(value || {});

  useEffect(()=>{
    onChange(check);
  },[]);

  const treeData = data && data.map((item) => {
    return {
      title: item.label,
      key: item.value,
    };
  });

  if (loading || deptLoading || positionLoading) {
    return null;
  }

  const position = (dept) => {

    const thisDept  = check.depts && check.depts.filter((value)=>{
      return value.key === dept.key;
    });

    return <Select
      mode="multiple"
      value={thisDept && thisDept.length>0 && thisDept[0].positions && thisDept[0].positions.map((items)=>{
        return items.value;
      }) || []}
      onClear
      style={{minWidth: 200}}
      bordered={false}
      placeholder="选择职位"
      options={positions || []}
      onChange={(value, option) => {

        const depts = {
          ...dept,
          positions: option,
        };

        const checkDepts = check.depts.filter((value) => {
          return value.key !== dept.key;
        });

        if (option.length > 0) {
          setCheck({depts: [...checkDepts, depts]});
          typeof onChange === 'function' && onChange({depts: [...checkDepts, depts]});
        } else {
          setCheck({depts: checkDepts});
          typeof onChange === 'function' && onChange({depts: checkDepts});
        }

      }}
    />;
  };


  const deptChildren = (children) => {
    return children.map((items) => {
      return {
        title: <>{items.title} {position(items)}</>,
        key: items.key,
        children: deptChildren(items.children),
      };
    });
  };

  const deptPosition = depts && depts.map((items) => {
    return {
      title: items.title,
      key: items.key,
      children: deptChildren(items.children),
    };
  });

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
            const users = option.checkedNodes.filter((value) => {
              return value.key !== 0;
            });
            setCheck({users});
            typeof onChange === 'function' && onChange({users});
          }}
          treeData={[{title: '全选', key: 0, children: treeData || []}]}
        />
      </>;
    case 'depts':
      return <>
        <Tree
          checkable={false}
          defaultExpandAll
          checkedKeys={check.depts && check.depts.map((items, index) => {
            return items.key;
          })}
          treeData={deptPosition || []}
        />
      </>;
    default:
      return null;
  }
};

export default UserTree;
