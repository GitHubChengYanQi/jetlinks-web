import React, {useRef, useState} from 'react';
import {useRouteMatch, useHistory} from 'ice';
import store from '@/store';
import {Drawer, Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';

const ErpLayout = ({children}) => {

  const match = useRouteMatch();
  const history = useHistory();

  const [drawerIsShow, showDrawer] = useState(false);
  const [userInfo] = store.useModel('user');
  const {menus} = userInfo;

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
      return (
        <Menu
          selectable
          onClick={(obj) => {
            history.push(obj.key);
          }}
          mode="horizontal"
          defaultSelectedKeys={[]}
          // style={{ borderRight: 'none' }}
        >{loopMenu(subMenus)}</Menu>
      );
    }
    return null;
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

  const rightMenu = () => {
    return (
      <Menu
        mode="horizontal"
      >
        <Menu.Item key="setting" onClick={() => {
          showDrawer(true);
        }}>设置</Menu.Item>
      </Menu>
    );
  };

  if (!subMenu) {
    return <div>菜单不存在</div>;
  }
  return (
    <TopLayout leftMenu={renderLeftMenu(subMenu.subMenus)} rightMenu={rightMenu()}>
      {children}
    </TopLayout>
  );
};
export default ErpLayout;
