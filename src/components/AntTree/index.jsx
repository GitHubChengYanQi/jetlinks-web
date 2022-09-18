import React from 'react';
import {Spin, Tree} from 'antd';


const AntTree = ({
  treeData,
  value,
  onChange,
  loading,
}) => {

  if (treeData.length === 0) {
    if (loading) {
      return <div style={{padding: 24, textAlign: 'center'}}><Spin/></div>;
    }
    return <></>;
  }
  return <Spin spinning={Boolean(loading)}>
    <Tree
      onSelect={(values) => {
        onChange(values);
      }}
      autoExpandParent
      defaultExpandAll
      selectedKeys={value}
      treeData={treeData}
    />
  </Spin>;
};

export default AntTree;
