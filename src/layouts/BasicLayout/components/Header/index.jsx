import React, {useState} from 'react';
import {
  BellOutlined,
  FullscreenOutlined
} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {Menu, Drawer, Avatar, Button, Dropdown, Tabs} from 'antd';
import store from '@/store';
import {useHistory, config} from 'ice';
import AppEntFUNC from '@/asseset/imgs/88.png';
import PassWord from '@/pages/Member/passWord';

import crm from '@/asseset/imgs/crm.png';
import erp from '@/asseset/imgs/erp.png';
import repair from '@/asseset/imgs/repair.png';
import protal from '@/asseset/imgs/protal.png';
import sys from '@/asseset/imgs/sys.png';
import menu from '@/asseset/imgs/menu.png';
import SPU from '@/asseset/imgs/spu.png';
import PRODUCTTION from '@/asseset/imgs/producttion.png';

import styles from './index.module.less';
import Message from '@/layouts/BasicLayout/components/Header/components/Message';
import Commission from '@/layouts/BasicLayout/components/Header/components/Commission';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';
import Remind from '@/layouts/BasicLayout/components/Header/components/Remind';

const {TabPane} = Tabs;

const AppIcon = {
  ENT_FUNC: menu,
  BASE_SYSTEM: sys,
  CRM: crm,
  ERP: erp,
  REPAIR: repair,
  protal,
  PRODUCTTION,
  SPU,

};

const Header = () => {

  const [visiblePwd, setVisiblePwd] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const history = useHistory();

  const [userInfo] = store.useModel('user');

  const {menus} = userInfo;

  const [visible, setVisible] = useState(false);

  const {loading, data} = useRequest({url: '/businessTrack/list', method: 'POST'});

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

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
                {config.projectName}
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
              <Dropdown visible={messageVisible} onVisibleChange={(value) => {
                setMessageVisible(value);
              }} trigger={['click']} overlay={
                <div className={styles.message}>
                  <Tabs centered>
                    <TabPane tab="消息" key="1">
                      <Message data={data} />
                    </TabPane>
                    <TabPane tab="通知" key="2">
                      <Remind data={data} />
                    </TabPane>
                    <TabPane tab="待办" key="3">
                      <Commission data={data} />
                    </TabPane>
                  </Tabs>
                </div>
              } placement="bottomRight">
                <Button type="text" size="large" icon={<BellOutlined />} style={{height: 60, color: '#FFF'}} />
              </Dropdown>
              <Button type="text" size="large" icon={<FullscreenOutlined />} style={{height: 60, color: '#FFF'}} />
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
              >{config.projectName}</span></div>
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
