import React, {useRef, useState} from 'react';
import {useRouteMatch, useHistory} from 'ice';
import store from '@/store';
import {Drawer, Menu, Modal} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import Icon from '@/components/Icon';
import styles from '@/pages/Crm/index.module.scss';
import BannerDifferenceList from '@/pages/Portal/bannerDifference/bannerDifferenceList';
import NavigationDifferenceList from '@/pages/Portal/navigationDifference/navigationDifferenceList';
import RemindList from '@/pages/Portal/remind/remindList';

const OemLayout = ({children}) => {

  const match = useRouteMatch();

  const [visible, showModel] = useState(false);
  const [type, setType] = useState(null);

  const [drawerIsShow, showDrawer] = useState(false);
  const [userInfo] = store.useModel('user');
  const {menus} = userInfo;

  const subMenu = Array.isArray(menus) && menus.find((item) => {
    return `/${item.id}` === match.path;
  });

  const RenderComponent = () => {
    switch (type) {
      case 'lbtfl':
        return <BannerDifferenceList />;
      case 'dhfl':
        return <NavigationDifferenceList />;
      case 'shtx':
        return <RemindList />;
      default:
        return null;
    }
  };


  const rightMenu = () => {
    return (
      <>
        <Menu
          selectable={false}
          mode="horizontal"
        >
          <Menu.Item key="setting" onClick={() => {
            showDrawer(true);
          }}><Icon type="icon-xitongpeizhi" /></Menu.Item>
        </Menu>
        <Drawer
          title={<span>设置</span>}
          style={{height: 'calc(100% - 112px)', top: 112}}
          visible={drawerIsShow}
          getContainer={false}
          bodyStyle={{padding: 0}}
          onClose={() => {
            showDrawer(false);
          }}>

          <div className={styles.settingMenu}>
            <Menu
              selectable={false}
              style={{width: '100%'}}
              onClick={(item) => {
                setType(item.key);
                showModel(true);
              }}
            >
              <Menu.Item key="lbtfl">
                <span>轮播图分类管理</span>
              </Menu.Item>
              <Menu.Item key="dhfl">
                <span>导航分类管理</span>
              </Menu.Item>
              <Menu.Item key="shtx">
                <span>售后提醒管理</span>
              </Menu.Item>
              <Menu.Divider />
            </Menu>
            <Modal centered destroyOnClose maskClosable={false} width={1100} visible={visible} onCancel={() => {
              showModel(false);
            }} footer={null}>{RenderComponent()}</Modal>
          </div>
        </Drawer>
      </>
    );
  };

  if (!subMenu) {
    return <div>菜单不存在</div>;
  }
  return (
    <TopLayout rightMenu={rightMenu()}>
      {children}
    </TopLayout>
  );
};
export default OemLayout;
