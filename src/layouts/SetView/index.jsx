import {Drawer, Menu} from 'antd';
import Icon from '@/components/Icon';
import React, {useState} from 'react';
import styles from './index.module.scss';

const SetView = ({mode = 'horizontal', theme, width = '50%', buttons = [], SetMenu}) => {

  const [drawerIsShow, showDrawer] = useState(false);

  return (
    <>
      <Menu
        selectable={false}
        mode="horizontal"
        theme={theme}
      >
        <Menu.Item
          style={{width, textAlign: 'center'}}
          key="setting"
          onClick={() => {
            showDrawer(true);
          }}><Icon type="icon-xitongpeizhi" /></Menu.Item>
        {buttons.map((Item) => {
          return Item;
        })}
      </Menu>
      <Drawer
        destroyOnClose
        title={<span>设置</span>}
        style={{
          height: mode === 'vertical' ? 'calc(100vh - 63px)' : 'calc(100vh - 112px)',
          top: mode === 'vertical' ? 63 : 112
        }}
        visible={drawerIsShow}
        getContainer={false}
        bodyStyle={{padding: 0}}
        placement={mode === 'vertical' ? 'left' : 'right'}
        onClose={() => {
          showDrawer(false);
        }}>
        <div className={styles.settingMenu}>
          {SetMenu}
        </div>
      </Drawer>
    </>
  );
};
export default SetView;
