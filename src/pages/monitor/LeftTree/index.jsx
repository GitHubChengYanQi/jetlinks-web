import React from 'react';
import {Button, Tabs} from 'antd';
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons';
import Group from '@/pages/monitor/LeftTree/components/Group';
import Terminal from '@/pages/monitor/LeftTree/components/Terminal';
import styles from './index.module.less';

const LeftTree = ({onChange,noEmpty, showModules, close, open, firstKey, modelId, classifyId}) => {

  const show = (key) => {
    return showModules ? showModules.includes(key) : true;
  };

  const items = [];

  if (show('terminal')) {
    items.push({
      key: '1',
      label: '终端设备',
      children: <Terminal noEmpty={noEmpty} value={modelId} firstKey={firstKey} onChange={onChange}/>
    });
  }
  if (show('group')) {
    items.push({
      key: '2',
      label: '设备分组',
      children: <Group all value={classifyId} onChange={onChange}/>
    });
  }

  if (open) {
    return <Button type="link" style={{padding: 0}} onClick={() => close()}>
      <RightCircleOutlined/>
    </Button>;
  }

  return <>
    <Tabs
      items={items}
      className={styles.tab}
      tabBarExtraContent={<>
        <Button type="link" style={{padding: 0}} onClick={() => close()}>
          <LeftCircleOutlined/>
        </Button>
      </>}
      defaultActiveKey="1"
      onChange={() => {

      }}/>
  </>;
};
export default LeftTree;
