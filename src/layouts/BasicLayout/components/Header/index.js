import React, {useState} from 'react';
import {
  SettingOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {Drawer} from 'antd';

import styles from './index.module.less';

const Header = () => {

  const [visible, setVisible] = useState(false);
  return (
    <>
      <header className={styles.navbar}>
        <div className={`row-flex ${styles.inner}`}>
          <div className={`${styles.systemBar}`}>
            <div className={styles.left}>
              <div id="navigation-dock">
                <div id="mainMenu" onClick={() => {
                  setVisible(true);
                }}>
                  <Icon type="icon-gongnengtubiao-134"/>
                </div>
              </div>
              <div id="navigation-title">
                React快速开发后台框架
              </div>
            </div>
            <div className={styles.middle}>3</div>
            <div className={styles.right}>
              <div><SettingOutlined/></div>
            </div>
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        closable={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        // mask={false}
        width={325}
        maskStyle={{opacity:0,background:'none'}}
      >
        <div className={styles.appItemWrap}>
          <div className="app-item">
            <div className="item-logo-wrap">

            </div>
            <div className="app-item-name">
              设置
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
