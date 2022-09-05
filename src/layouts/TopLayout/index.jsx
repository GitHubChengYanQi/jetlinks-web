import React from 'react';
import {useHistory, useLocation} from 'ice';
import {ProLayout} from '@ant-design/pro-layout';
import store from '@/store';
import styles from './index.module.less';
import logo from '../../asseset/imgs/logo.png';

const TopLayout = ({children}) => {

  const history = useHistory();
  const location = useLocation();
  const [userInfo] = store.useModel('user');
  const {menus} = userInfo;

  const routes = (menuList) => {
    return menuList.map(item => {
      return {
        name: item.name,
        path: item.url === '#' ? item.code :(item.url || `/${item.id}`),
        routes: (item.subMenus || item.children) ? routes(item.subMenus || item.children) : [],
      };
    });
  };

  const menuDataRender = (menuList) => {
    return menuList.map(item => {
      return {
        ...item,
        icon: null,
        children: item.children ? menuDataRender(item.children) : [],
      };
    });
  };

  return <ProLayout
    location={location}
    route={{
      path: '/',
      routes: routes(menus)
    }}
    className={styles.layout}
    menuItemRender={(menuItemProps, defaultDom) => {
      if (menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }
      return <div onClick={() => history.push(menuItemProps.path)}>{defaultDom}</div>;
    }}
    menuDataRender={(props) => menuDataRender(props)}
    rightContentRender={() => <></>}
    title={<div className={styles.layoutTitle}>
      奥普泰设备业务云平台
    </div>}
    logo={logo}
    splitMenus
    collapsed={false}
    headerTheme="light"
    navTheme="dark"
    layout="mix"
  >
    <div style={{maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', overflowX: 'hidden'}}>
      {children}
    </div>
  </ProLayout>;
};
export default TopLayout;
