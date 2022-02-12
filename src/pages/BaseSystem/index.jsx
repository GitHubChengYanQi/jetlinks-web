import SiderLayout from '@/layouts/SiderLayout';
import React from 'react';
import {useRouteMatch, useHistory, useLocation} from 'ice';
import store from '@/store';
import { Menu } from 'antd';
// import * as Icon from '@ant-design/icons';

const BaseSystem = ({ children }) => {

  const match = useRouteMatch();
  const history = useHistory();

  const location = useLocation();

  const [userInfo] = store.useModel('user');
  const { menus } = userInfo;

  const subMenu = Array.isArray(menus) && menus.find((item) => {
    return `/${item.id}` === match.path;
  });


  const loopMenu = (subMenus) => {
    return subMenus.map((item) => {
      return renderItem(item);
    });
  };

  const renderLeftMenu = (subMenus) => {
    if (subMenus) {
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
          mode="inline"
          defaultSelectedKeys={[]}
          // style={{ borderRight: 'none' }}
        >{loopMenu(subMenus)}</Menu>
      );
    }
    return null;
  };

  const renderItem = (item) => {
    if (item.children) {
      return (<Menu.ItemGroup key={item.id} title={item.name}>{loopMenu(item.children)}</Menu.ItemGroup>);
    }
    const IconNode = null;// item.icon?Icon[item.icon]:null;
    return (
      <Menu.Item key={item.url} icon={IconNode ? <IconNode/> : null}>{item.name}</Menu.Item>
    );
  };
  // console.log(subMenu);
  return (
    <SiderLayout left={renderLeftMenu(subMenu.subMenus)}>{children}</SiderLayout>
  );
};

export default BaseSystem;
