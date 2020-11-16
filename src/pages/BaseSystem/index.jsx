import SiderLayout from '@/layouts/SiderLayout';
import React from 'react';
import {useRouteMatch, useHistory} from 'ice';
import store from '@/store';
import {Menu} from 'antd';
import * as Icon from '@ant-design/icons';

const BaseSystem = ({children}) => {

  const match = useRouteMatch();
  const history  = useHistory();

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
            console.log(obj);
            history.push(obj.key);
          }}
          mode="inline"
          defaultSelectedKeys={[]}
          style={{borderRight: 'none'}}
        >{loopMenu(subMenus)}</Menu>
      );
    }
    return null;
  };

  const renderItem = (item) => {
    if (item.children) {
      return (<Menu.ItemGroup key={item.id} title={item.name}>{loopMenu(item.children)}</Menu.ItemGroup>);
    }
    const IconNode = item.icon?Icon[item.icon]:null;
    return (
      <Menu.Item key={item.url} icon={IconNode?<IconNode />:null}>{item.name}</Menu.Item>
    );
  };
  return (
    <div className="content-wrap">
      <SiderLayout left={renderLeftMenu(subMenu.subMenus)}>{children}</SiderLayout>
    </div>
  );
};

export default BaseSystem;
