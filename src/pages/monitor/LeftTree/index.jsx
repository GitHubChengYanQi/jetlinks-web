import React from 'react';
import {Button, Tabs} from 'antd';
import {LeftCircleOutlined} from '@ant-design/icons';
import Group from '@/pages/monitor/LeftTree/components/Group';
import Terminal from '@/pages/monitor/LeftTree/components/Terminal';
import styles from './index.module.less';

const LeftTree = (props) => {

  const {onChange, showModules, noAction, close} = props;

  const show = (key) => {
    return showModules ? showModules.includes(key) : true;
  };

  const items = [];

  if (show('terminal')) {
    items.push({
      key: '1',
      label: '终端设备',
      children: <Terminal noAction={noAction} onChange={onChange} />
    });
  } else if (show('group')) {
    items.push({
      key: '2',
      label: '设备分组',
      children: <Group noAction={noAction} onChange={onChange} />
    });
  }

  return <>
    <Tabs
      items={items}
      className={styles.tab}
      tabBarExtraContent={<>
        <Button type="link" onClick={() => close()}>
          <LeftCircleOutlined />
        </Button>
      </>}
      defaultActiveKey="1"
      onChange={() => {

      }} />
  </>;
};
export default LeftTree;
