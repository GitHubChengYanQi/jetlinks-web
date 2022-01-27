import React from 'react';
import {Spin, Tree} from 'antd';
import {deptTree} from '@/Config/ApiUrl/system/dept';
import {useRequest} from '@/util/Request';


const DeptTree = ({onChange=()=>{}, value}) => {

  const {loading, data} = useRequest(deptTree);

  const deptChildren = (children) => {
    return children.map((items) => {
      return {
        title: items.title,
        key: items.key,
        children: deptChildren(items.children),
      };
    });
  };

  const deptPosition = data && data.map((items) => {
    return {
      title: items.title,
      key: items.key,
      children: deptChildren(items.children),
    };
  });

  if (loading) {
    return <div style={{textAlign: 'center'}}><Spin size="large" /></div>;
  }

  return <Tree
    checkable
    defaultExpandAll
    checkedKeys={value}
    treeData={deptPosition || []}
    onCheck={(value, options) => {
      onChange(value);
    }}
  />;
};
export default DeptTree;
