import React, {useState} from 'react';
import AntTree from '../../../../../components/AntTree';
import Save from './Save';
import {isArray} from '@/util/Tools';
import store from '@/store';

const Group = (
  {
    onChange = () => {
    },
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

  return <>
    <AntTree
      onChange={(keys) => {
        onChange(keys[0], 'group');
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
