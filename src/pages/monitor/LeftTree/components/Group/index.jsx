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
    checkable,
  }
) => {

  const multipleValue = value || [];
  const noMultipleValue = value ? [value] : [];

  const [keys, setKeys] = useState(checkable ? multipleValue : noMultipleValue);

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
      checkable={checkable}
      onChange={(keys, options) => {
        setKeys(keys);
        if (checkable) {
          onChange(keys);
          return;
        }
        onChange(keys[0], 'group', options.selected ? {
          key: options?.node?.key,
          title: options?.node?.title
        } : {});
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
