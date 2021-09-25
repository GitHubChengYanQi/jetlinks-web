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
import Bind from '@/asseset/imgs/bind.png';
import Men from '@/asseset/imgs/men.png';
import Sys from '@/asseset/imgs/sys.png';
import Portal from '@/asseset/imgs/portal.png';
import Repair from '@/asseset/imgs/repair.png';
import Shop from '@/asseset/imgs/shop.png';
import crm from '@/asseset/imgs/CRM.png';
import erp from '@/asseset/imgs/ERP.png';
import PassWord from '@/pages/Member/passWord';
import styles from './index.module.less';

const {TabPane} = Tabs;

const AppIcon = {
  ENT_FUNC: Men,
  BASE_SYSTEM: Sys,
  userInfo: Bind,
  CRM: crm,
  ERP: erp,
  REPAIR: Repair,
  shop: Shop,
  protal: Portal,
};

const Header = () => {

  const [visiblePwd, setVisiblePwd] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

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
                      <div className="noMessage">暂无消息</div>
                    </TabPane>
                    <TabPane tab="通知" key="2">
                      <div className="noMessage">暂无通知</div>
                    </TabPane>
                    <TabPane tab="待办" key="3">
                      <div className="noMessage">暂无待办</div>
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
                        <img className="app-item-logo" src={AppIcon[item.id] || AppEntFUNC} alt="logo" />
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
