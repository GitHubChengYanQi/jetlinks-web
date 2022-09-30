import React from 'react';
import {Spin, Tree} from 'antd';


const AntTree = ({
  treeData,
  value,
  onChange,
  loading,
  checkable,
}) => {

  if (treeData.length === 0) {
    if (loading) {
      return <div style={{padding: 24, textAlign: 'center'}}><Spin /></div>;
    }
    return <></>;
  }
  return <Spin spinning={Boolean(loading)}>
    <Tree
      checkedKeys={value}
      selectable={!checkable}
      checkable={checkable}
      onCheck={onChange}
      onSelect={onChange}
      autoExpandParent
      defaultExpandAll
      selectedKeys={value}
      treeData={treeData}
    />
  </Spin>;
};

export default AntTree;
