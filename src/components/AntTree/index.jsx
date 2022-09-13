import React from 'react';
import {Spin, Tree} from 'antd';
import styles from './index.module.less';


const AntTree = ({
  treeData,
  value,
  onChange,
  loading,
}) => {

  if (treeData.length === 0 && loading) {
    return <div style={{padding: 24, textAlign: 'center'}}><Spin/></div>;
  }

  return <Spin spinning={Boolean(loading)}>
    <Tree
      onSelect={(values) => {
        onChange(values);
      }}
      autoExpandParent
      defaultExpandAll
      checkedKeys={value}
      treeData={treeData}
    />
  </Spin>;
};

export default AntTree;
