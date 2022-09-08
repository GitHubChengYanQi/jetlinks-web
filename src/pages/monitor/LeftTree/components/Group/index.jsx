import React, {useState} from 'react';
import {Button, Menu} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import AntTree from '../../../../../components/AntTree';
import Warning from '@/components/Warning';
import styles from '../../index.module.less';
import Save from './Save';
import {useRequest} from '@/util/Request';
import {deviceClassifyTree} from '@/pages/equipment/Grouping/url';

const Group = (
  {noAction, onChange, value}
) => {

  const [keys, setKeys] = useState(value ? [value] : []);

  const [saveVisible, setSaveVisible] = useState();
  const [currentItem, setCurrentItem] = useState({});

  const {loading, data} = useRequest(deviceClassifyTree);

  const formatData = (data = []) => {
    return data.map(item => {
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
    {!noAction && <Button
      type="primary"
      className={styles.add}
      icon={<PlusOutlined/>}
      onClick={() => {
        setCurrentItem({});
        setSaveVisible(true);
      }}
    >新建客户</Button>}
    <AntTree
      loading={loading}
      noAction={noAction}
      menu={menu}
      onChange={(keys) => {
        onChange(keys[0]);
        setKeys(keys);
      }}
      value={keys}
      treeData={formatData(data)}
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
