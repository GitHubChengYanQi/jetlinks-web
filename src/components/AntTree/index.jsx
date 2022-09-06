import React from 'react';
import {Dropdown, Spin, Tree} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.module.less';



const AntTree = (props) => {
  const {
    treeData,
    value,
    onChange,
    multiple,
    loading,
    onGetNode = () => {
    },
    menu = () => {
      return <></>;
    },
    noAction,
  } = props;

  if (treeData.length === 0 && loading){
    return <div style={{padding:24,textAlign:'center'}}><Spin /></div>;
  }


  return <Spin spinning={Boolean(loading)}>
    <Tree
      className={styles.tree}
      selectable={false}
      autoExpandParent
      defaultExpandAll
      checkedKeys={value}
      titleRender={(node) => {
        const checked = value.includes(node.key);
        return <div className={styles.node}>
          <div className={styles.nodeTitle} onClick={() => {
            if (checked) {
              onGetNode(null);
              onChange(value.filter(item => item !== node.key));
            } else {
              onGetNode(node);
              onChange(multiple ? [...value, node.key] : [node.key]);
            }
          }}>
            <span className={classNames(checked && styles.check, styles.title)}>{node.title}</span>
          </div>
          {!noAction && <Dropdown overlay={menu(node)} trigger={['click']} placement="bottom">
            <EllipsisOutlined />
          </Dropdown>}
        </div>;
      }}
      treeData={treeData}
    />
  </Spin>;
};

export default AntTree;
