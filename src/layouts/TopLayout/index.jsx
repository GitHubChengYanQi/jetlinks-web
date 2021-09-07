import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import store from '@/store';
import {useHistory, useLocation, useRouteMatch} from 'ice';
import styles from './index.module.less';

const {Header, Sider, Content} = Layout;

const TopLayout = ({children, rightMenu:RightMenu}) => {

  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [mode, setMode] = useState('vertical');// horizontal

  const [userInfo] = store.useModel('user');
  const {menus} = userInfo;

  const subMenu = Array.isArray(menus) && menus.find((item) => {
    return `/${item.id}` === match.path;
  });

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
    const IconNode = null;// item.icon?Icon[item.icon]:null;
    return (
      <Menu.Item key={item.url} icon={IconNode ? <IconNode /> : null}>{item.name}</Menu.Item>
    );
  };

  const renderLeftMenu = () => {
    console.log(subMenu);
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

  console.log(mode);

  return (
    <Layout>
      {mode === 'horizontal' && <Header theme="light" className={styles.header}>
        <div className={styles.leftMenu}>{renderLeftMenu()}</div>
        <div className={styles.rightMenu}>{RightMenu}</div>
      </Header>}
      {mode === 'vertical' && <Sider theme="dark" width={220}>
        {renderLeftMenu()}
        <div style={{position:'absolute',bottom: 0,width: '100%'}}><RightMenu mode={mode} theme={mode === 'vertical' ? 'dark' : 'light'} /></div>
      </Sider>}
      <Content style={{overflowY: 'auto', height: mode === 'vertical'?'calc(100vh - 63px)':'calc(100vh - 112px)'}}>{children}</Content>
    </Layout>
  );
};
export default TopLayout;
