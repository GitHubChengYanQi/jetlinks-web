import React, {useState} from 'react';
import {Avatar, Button, Layout, Menu} from 'antd';
import store from '@/store';
import {useHistory, useLocation, useRouteMatch} from 'ice';
import Icon from '@/components/Icon';
import styles from './index.module.less';

const {Header, Sider, Content} = Layout;
const {Item: MenuItem} = Menu;

const TopLayout = ({children, rightMenu: RightMenu}) => {

  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [mode, setMode] = useState(localStorage.getItem('tianPeng-layout') === 'horizontal' ? 'horizontal' : 'vertical');// horizontal

  const [userInfo] = store.useModel('user');
  const {menus} = userInfo;


  const subMenu = Array.isArray(menus) && menus.find((item) => {
    return `/${item.id}` === match.path;
  });

  // console.log(subMenu);

  const loopMenu = (subMenus) => {
    if (!Array.isArray(subMenus)) {
      return null;
    }
    return subMenus.map((item) => {
      return renderItem(item);
    });
  };

  const renderItem = (item) => {
    if (item.children) {
      return (<Menu.SubMenu key={item.id} title={item.name}>{loopMenu(item.children)}</Menu.SubMenu>);
    }
    return (
      <Menu.Item key={item.url} icon={item.icon && <Icon style={{fontSize:16,color:'#ffffff'}} type={item.icon} />} >{item.name}</Menu.Item>
    );
  };

  const renderLeftMenu = () => {
    if (subMenu.subMenus) {
      const pathName = location.pathname;
      const pathArray = pathName.split('/');
      const key = `/${pathArray[1]}/${pathArray[2]}`;
      return (
        <Menu
          selectable
          selectedKeys={[key]}
          onClick={(obj) => {
            history.push(obj.key);
          }}
          mode={mode}
          defaultSelectedKeys={[]}
          // style={{ borderRight: 'none' }}
          theme={mode === 'vertical' ? 'dark' : 'light'}
        >{loopMenu(subMenu.subMenus)}</Menu>
      );
    }
    return null;
  };

  const renderRightMenu = () => {
    return (
      <RightMenu
        mode={mode}
        theme={mode === 'vertical' ? 'dark' : 'light'}
        buttons={[
          <MenuItem
            style={{
              width: '50%',
              textAlign: 'center'
            }}
            key="layout"
            onClick={() => {
              localStorage.setItem('tianPeng-layout', mode === 'vertical' ? 'horizontal' : 'vertical');
              setMode(mode === 'vertical' ? 'horizontal' : 'vertical');
            }}>
            <Icon type={mode === 'vertical' ? 'icon-layout-top-line' : 'icon-layout-left-line'} />
          </MenuItem>
        ]}
      />
    );
  };

  return (
    <Layout style={{height:'100%'}}>
      {mode === 'horizontal' && <Header theme="light" className={styles.header}>
        <div className={styles.leftMenu}>{renderLeftMenu()}</div>
        <div className={styles.rightMenu}>
          {renderRightMenu()}
        </div>
      </Header>}
      {mode === 'vertical' && <Sider theme="dark" width={200}>
        <div style={{height:'100%'}}>
          <div className={styles.leftLogo}>
            {subMenu.name}
          </div>
          <div style={{maxHeight:'calc(100% - 98px)',overflowY:'auto'}}>
            {renderLeftMenu()}
          </div>

        </div>

        <div style={{position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #666'}}>
          {renderRightMenu()}
        </div>
      </Sider>}
      <Content style={{
        overflowY: 'auto',
        height: mode === 'vertical' ? 'calc(100vh - 63px)' : 'calc(100vh - 112px)'
      }}>{children}</Content>
    </Layout>
  );
};
export default TopLayout;
