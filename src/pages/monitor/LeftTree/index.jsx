import React from 'react';
import {Button, Tabs} from 'antd';
import {LeftCircleOutlined} from '@ant-design/icons';
import Group from '@/pages/monitor/LeftTree/components/Group';
import Terminal from '@/pages/monitor/LeftTree/components/Terminal';
import styles from './index.module.less';

const {TabPane} = Tabs;

const LeftTree = (props) => {
  const {onChange, showModules, noAction, close} = props;

  const show = (key) => {
    return showModules ? showModules.includes(key) : true;
  };

  return <>
    <Tabs
      className={styles.tab}
      tabBarExtraContent={<>
        <Button type='link' onClick={() => close()}>
          <LeftCircleOutlined />
        </Button>
      </>}
      defaultActiveKey="1"
      onChange={() => {

      }}>
      {show('terminal') && <TabPane tab="终端设备" key="1">
        <Terminal noAction={noAction} onChange={onChange} />
      </TabPane>}
      {show('group') && <TabPane tab="设备分组" key="2">
        <Group noAction={noAction} onChange={() => {
        }} />
      </TabPane>}
    </Tabs>
  </>;
};

export default LeftTree;
