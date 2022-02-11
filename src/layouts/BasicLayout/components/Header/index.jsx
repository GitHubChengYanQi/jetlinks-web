import React, {useState} from 'react';
import {
  FullscreenOutlined
} from '@ant-design/icons';
import {Menu, Drawer, Avatar, Button, Dropdown} from 'antd';
import {useHistory, config} from 'ice';
import Icon from '@/components/Icon';
import store from '@/store';
import AppEntFUNC from '@/asseset/imgs/88.png';
import PassWord from '@/pages/Member/passWord';

import crm from '@/asseset/imgs/crm.png';
import erp from '@/asseset/imgs/erp.png';
import repair from '@/asseset/imgs/repair.png';
import protal from '@/asseset/imgs/protal.png';
import sys from '@/asseset/imgs/sys.png';
import menu from '@/asseset/imgs/menu.png';
import SPU from '@/asseset/imgs/spu.png';
import production from '@/asseset/imgs/production.png';
import workflow from '@/asseset/imgs/workflow.png';
import purchase from '@/asseset/imgs/purchase.png';

import styles from './index.module.less';
import Message from '@/layouts/BasicLayout/components/Header/components/Message';
import {toggleFullScreen} from '@/layouts/BasicLayout/components/Header/components/FullScreen';

const AppIcon = {
  ENT_FUNC: menu,
  BASE_SYSTEM: sys,
  CRM: crm,
  ERP: erp,
  REPAIR: repair,
  protal,
  production,
  SPU,
  workflow,
  purchase,
};


const Header = () => {

  const [visiblePwd, setVisiblePwd] = useState(false);

  const history = useHistory();

  const [userInfo] = store.useModel('user');

  const {menus} = userInfo;

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
                  <Icon type="icon-fenlei1" />
                </div>
              </div>
              <div
                onClick={() => {
                  history.push('/');
                }}
                id="navigation-title"
                className={styles.navigationTitle}>
                {userInfo.abbreviation}
              </div>
            </div>
            <div className={styles.middle} />
            <div className={styles.right}>
              <Dropdown trigger={['click']} overlay={
                <Menu style={{width: 220}} onClick={({key}) => {
                  if (key === 'name') {
                    return;
                  }
                  if (key === '/password') {
                    setVisiblePwd(true);
                  } else {
                    history.push(key);
                  }
                }}>
                  <Menu.Item key="name" style={{padding: 12, fontSize: 16, color: '#7f7f7f'}}>
                    {userInfo.name}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="/member">
                    <span className={styles.dropdownMenuItem}>个人中心</span>
                  </Menu.Item>
                  <Menu.Item key="/password">
                    <span className={styles.dropdownMenuItem}>修改密码</span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="/logout">
                    <span className={styles.dropdownMenuItem}>退出登录</span>
                  </Menu.Item>
                </Menu>
              } placement="bottomRight">
                <Button type="text" size="large" style={{height: 60}}>
                  <Avatar
                    style={{float: 'left'}}
                    src={`${config.baseURI}${userInfo.avatar}`}
                  />
                </Button>
              </Dropdown>
              <Message />
              <Button type="text" size="large" style={{height: 60, color: '#FFF'}} onClick={(event)=>{
                toggleFullScreen(event);
              }} ><FullscreenOutlined /></Button>
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
        maskStyle={{opacity: 0, background: 'none'}}
        bodyStyle={{padding: 0, margin: 0}}
      >
        <div className="docker-top-container">
          <div className="docker-top-title">
            <div className="css-1b5qfbo">
              <Icon type="icon-fenlei1" />
            </div>
            <div className="docker-top-text">
              <span
                aria-haspopup="true"
                aria-expanded="false"
              >{userInfo.abbreviation}</span></div>
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
                        <img style={{
                          boxShadow: 'none',
                        }} className="app-item-logo" src={AppIcon[item.id] || AppEntFUNC} alt="logo" />
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
      <PassWord visible={visiblePwd} onClose={() => setVisiblePwd(false)} />
    </>
  );
};

export default Header;
