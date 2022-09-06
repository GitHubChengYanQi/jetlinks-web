import React, {useEffect, useState} from 'react';
import {Button, Menu} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import AntTree from '@/components/AntTree';
import Warning from '@/components/Warning';
import styles from '../../index.module.less';
import Save from '@/pages/equipment/Category/Save';

const Terminal = (props) => {

  const {
    noAction,
    onChange,
    value,
    onGetNode = () => {
    }
  } = props;

  const [keys, setKeys] = useState(value ? [value] : []);

  const [saveVisible, setSaveVisible] = useState();
  const [currentItem, setCurrentItem] = useState({});

  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);

  const getTreeData = () => {


  };

  useEffect(() => {
    getTreeData();
  }, []);

  const formatData = (data) => {
    return data.map(item => {
      return {
        key: item.id,
        title: `${item.name} (${item.number || 0})`,
        item,
        children: formatData(item.children || []),
      };
    });
  };

  const menu = (node) => {
    return <Menu
      items={[
        {
          key: '1',
          label: '编辑',
          onClick: () => {
            setCurrentItem(node.item);
            setSaveVisible(true);
          }
        },
        {
          key: '2',
          label: <Warning>删除</Warning>,
        }
      ]}
    />;
  };

  return <>
    {!noAction && <Button
      type='primary'
      className={styles.add}
      icon={<PlusOutlined />}
      onClick={() => {
        setCurrentItem({});
        setSaveVisible(true);
      }}
    >新建设备类别</Button>}
    <AntTree
      onGetNode={onGetNode}
      loading={loading}
      noAction={noAction}
      menu={menu}
      onChange={(keys) => {
        onChange(keys[0]);
        setKeys(keys);
      }}
      value={keys}
      treeData={formatData(treeData)}
    />

    <Save
      status
      close={() => {
        setSaveVisible(false);
        setCurrentItem({});
      }}
      visible={saveVisible}
      data={currentItem}
      success={() => {
        getTreeData();
      }} />
  </>;
};

export default Terminal;
