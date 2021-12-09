import React, {useEffect, useState} from 'react';
import {Select, Tree} from 'antd';
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

  useEffect(() => {
    onChange(check);
  }, []);

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

    const thisDept = check.data && check.data.filter((value) => {
      return value.DepstPositions && value.DepstPositions.key === dept.key;
    });

    return <Select
      mode="multiple"
      value={thisDept && thisDept.length > 0 && thisDept[0].DepstPositions.positions && thisDept[0].DepstPositions.positions.map((items) => {
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

        const checkDepts = check.data.filter((value) => {
          return value.DepstPositions.key !== dept.key;
        });

        if (option.length > 0) {
          setCheck({data: [...checkDepts, {DepstPositions:depts}]});
          typeof onChange === 'function' && onChange({data: [...checkDepts, {DepstPositions:depts}]});
        } else {
          setCheck({data: checkDepts});
          typeof onChange === 'function' && onChange({data: checkDepts});
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
    case 'AppointUser':
      return <>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={check.data && check.data.map((items, index) => {
            return items.AppointUser.key;
          })}
          onCheck={(value, option) => {
            const users = option.checkedNodes.filter((value) => {
              return value.key !== 0;
            });

            const AppointUser = users.map((items) => {
              return {
                AppointUser: items,
              };
            });

            setCheck({data:AppointUser });
            typeof onChange === 'function' && onChange({data: AppointUser});
          }}
          treeData={[{title: '全选', key: 0, children: treeData || []}]}
        />
      </>;
    case 'DepstPositions':
      return <>
        <Tree
          checkable={false}
          defaultExpandAll
          checkedKeys={check.data && check.data.map((items, index) => {
            return items.DepstPositions.key;
          })}
          treeData={deptPosition || []}
        />
      </>;
    default:
      return null;
  }
};

export default UserTree;
