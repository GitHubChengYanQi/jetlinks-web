import React, {useState} from 'react';
import {Button, Menu} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import AntTree from '../../../../../components/AntTree';
import Warning from '@/components/Warning';
import styles from '../../index.module.less';
import Save from './Save';

const Group = (props) => {


  const {noAction, onChange, value} = props;

  const [keys, setKeys] = useState(value ? [value] : []);

  const [saveVisible, setSaveVisible] = useState();
  const [currentItem, setCurrentItem] = useState({});

  const treeData = [{
    title: '辽宁公司1',
    key: '1',
    number: 12,
    children: [{
      title: '辽宁公司2',
      key: '2',
      number: 34,
      children: [{
        title: '辽宁公司3',
        key: '3',
        number: 65,
        children: []
      }]
    }, {
      title: '辽宁公司4',
      key: '4',
      number: 12,
      children: []
    },]
  }];

  const formatData = (data) => {
    return data.map(item => {
      return {
        ...item,
        title: `${item.title} (${item.number})`,
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
      type='primary'
      className={styles.add}
      icon={<PlusOutlined />}
      onClick={() => {
        setCurrentItem({});
        setSaveVisible(true);
      }}
    >新建客户</Button>}
    <AntTree
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
