import React, {useEffect} from 'react';
import {config, useHistory, useLocation} from 'ice';
import {ProLayout} from '@ant-design/pro-layout';
import cookie from 'js-cookie';
import store from '@/store';
import styles from './index.module.less';
import logo from '../../asseset/imgs/logo.png';
import Avatar from '@/layouts/TopLayout/components/Avatar/Avatar';
import Setting from '@/layouts/TopLayout/components/Setting/inedx';
import Message from '@/layouts/TopLayout/components/Message/inedx';
import Action from '@/layouts/TopLayout/components/Action/inedx';
import {isArray, isObject} from '@/util/Tools';
import {preview} from '@/components/DownloadFile';

const TopLayout = ({children}) => {

  const history = useHistory();
  const location = useLocation();
  const [userInfo] = store.useModel('user');
  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource?.customer || {};
  const {menus} = userInfo;

  const getRoutes = (menuList) => {
    return isArray(menuList).map(item => {
      if (item.ismenu === 'N') {
        return null;
      }
      return {
        name: item.name,
        path: item.url === '#' ? item.code : (item.url || `/${item.id}`),
        routes: !['statistical', 'electronicsMap', 'monitor'].includes(item.id) ? getRoutes(item.subMenus || item.children) : [],
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

  const routes = getRoutes(menus);

  const getFirstRoute = (route) => {
    if (route) {
      if (route.routes.length > 0) {
        return getFirstRoute(route.routes[0]);
      } else {
        return route;
      }
    }

  };

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const sysLogo = customer.logo ? `${baseURI}${preview}?fileId=${customer.logo}&authorization=${token}` : logo;

  useEffect(() => {
    if (location.pathname === '/') {
      const pash = isObject(getFirstRoute(routes[0])).path;
      if (pash) {
        history.push(pash);
      }
    }
  }, [location.pathname]);

  return <ProLayout
    collapsed={false}
    collapsedButtonRender={null}
    location={location}
    route={{
      path: '/',
      routes
    }}
    className={styles.layout}
    menuItemRender={(menuItemProps, defaultDom) => {
      if (menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }
      return <div onClick={() => history.push(menuItemProps.path)}>{defaultDom}</div>;
    }}
    menuDataRender={(props) => menuDataRender(props)}
    rightContentRender={() => <>
      {/* <Setting/> */}
      <Message />
      {/* <Action/> */}
      <Avatar userInfo={userInfo} logo={sysLogo} />
    </>
    }
    title={customer.resetName || '奥普泰设备业务云平台'}
    logo={sysLogo}
    splitMenus
    // collapsed={false}
    headerTheme="light"
    layout="mix"
  >
    <div style={{height: 'calc(100vh - 100px)', overflowY: 'auto', overflowX: 'hidden'}}>
      {children}
    </div>
  </ProLayout>;
};
export default TopLayout;
