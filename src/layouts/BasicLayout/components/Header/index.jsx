import React, { useState } from 'react';
import {
  SettingOutlined,
  BellOutlined,
  FullscreenOutlined
} from '@ant-design/icons';
import Icon from '@/components/Icon';
import { Menu, Drawer, Avatar, Image, Button, Dropdown } from 'antd';
import store from '@/store';
import { useHistory, config } from 'ice';
import AppEntFUNC from '@/asseset/imgs/88.png';

import styles from './index.module.less';

const AppIcon = {
  ENT_FUNC: AppEntFUNC,
  BASE_SYSTEM: AppEntFUNC
};

const Header = () => {

  const history = useHistory();

  const [userInfo] = store.useModel('user');
  const { menus } = userInfo;

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
            <div className={styles.middle}/>
            <div className={styles.right}>
              <Dropdown trigger="click" overlay={
                <Menu style={{ width: 220 }}>
                  <div style={{padding:12,fontSize:16,color:'#7f7f7f'}}>
                    {userInfo.name}
                  </div>
                  <Menu.Divider/>
                  <Menu.Item>
                    <span className={styles.dropdownMenuItem}>个人中心</span>
                  </Menu.Item>
                  <Menu.Item>
                    <span className={styles.dropdownMenuItem}>修改密码</span>
                  </Menu.Item>
                  <Menu.Divider/>
                  <Menu.Item>
                    <span className={styles.dropdownMenuItem}>退出登录</span>
                  </Menu.Item>
                </Menu>
              } placement="bottomRight">
                <Button type="text" size="large" style={{ height: 48 }}>
                  <Avatar
                    style={{ float: 'left' }}
                    src={<Image
                      src={`${config.baseURI}${userInfo.avatar}`}
                      preview={false}/>}
                    // size="small"
                  />
                  <span
                    style={{ float: 'left', marginLeft: 8, height: 32, lineHeight: '32px' }}>{userInfo.name}</span>
                  {/* <CaretDownOutlined /> */}
                </Button>
              </Dropdown>
              <Button type="text" size="large" icon={<BellOutlined/>} style={{ height: 48 }}/>
              <Button type="text" size="large" icon={<FullscreenOutlined/>} style={{ height: 48 }}/>
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
        width={325}
        maskStyle={{ opacity: 0, background: 'none' }}
        bodyStyle={{ padding: 0, margin: 0 }}
      >
        <div className="docker-top-container">
          <div className="docker-top-title">
            <div className="css-1b5qfbo">
              <Icon type="icon-gongnengtubiao-134"/>
            </div>
            <div className="docker-top-text"><span aria-haspopup="true" aria-expanded="false">AT-Soft</span></div>
          </div>
        </div>
        <div className="docker-middle">
          <div className={styles.appContent}>
            {menus && Array.isArray(menus) && menus.map((item, index) => {
              return (
                <div className={styles.appItemWrap} key={index} onClick={() => {
                  setVisible(false);
                  history.push(`/${item.id}`);
                }}>
                  <div className="app-item">
                    <div className="item-logo-wrap">
                      <span className="navigation-badge">
                        <img className="app-item-logo" src={AppIcon[item.id] || AppEntFUNC} alt="logo"/>
                      </span>
                    </div>
                    <div className="app-item-name">
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
