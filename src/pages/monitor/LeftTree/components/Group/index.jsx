import React, {useState} from 'react';
import {Menu} from 'antd';
import AntTree from '../../../../../components/AntTree';
import Warning from '@/components/Warning';
import Save from './Save';
import {isArray} from '@/util/Tools';
import store from '@/store';

const Group = (
  {
    noAction,
    onChange,
    value,
  }
) => {

  const [keys, setKeys] = useState(value ? [value] : []);

  const [saveVisible, setSaveVisible] = useState();
  const [currentItem, setCurrentItem] = useState({});

  const [dataSource] = store.useModel('dataSource');

  const formatData = (data) => {
    return isArray(data).map(item => {
      return {
        ...item,
        children: formatData(item.children),
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
            setCurrentItem({id: node.title});
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
    <AntTree
      noAction={noAction}
      menu={menu}
      onChange={(keys) => {
        onChange(keys[0]);
        setKeys(keys);
      }}
      value={keys}
      treeData={[{key: '0', title: '全部分组', children: formatData(dataSource.deviceClass)}]}
    />

    <Save
      visible={saveVisible}
      close={() => {
        setSaveVisible(false);
        setCurrentItem({});
      }}
      data={currentItem}
    />
  </>;
};

export default Group;
