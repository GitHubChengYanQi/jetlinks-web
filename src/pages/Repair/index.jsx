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

const RepairLayout = ({children}) => {

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
      case 'shtx':
        return <RemindList />;
      default:
        return null;
    }
  };


  const RightMenu = ({mode = 'horizontal', theme, width = '50%'}) => {
    return (
      <>
        <Menu
          selectable={false}
          mode="horizontal"
          theme={theme}
        ><Menu.Item style={{width, textAlign: 'center'}} key="setting" onClick={() => {
          showDrawer(true);
        }}><Icon type="icon-xitongpeizhi" /></Menu.Item>
          <Menu.Item style={{width, textAlign: 'center'}} key="setting1" onClick={() => {
            showDrawer(true);
          }}><Icon type="icon-xitongpeizhi" /></Menu.Item>
        </Menu>
        <Drawer
          title={<span>设置</span>}
          style={{height: 'calc(100% - 112px)', top: 112}}
          visible={drawerIsShow}
          getContainer={false}
          bodyStyle={{padding: 0}}
          placement={mode === 'vertical' ? 'left' : 'right'}
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
    <TopLayout rightMenu={RightMenu}>
      {children}
    </TopLayout>
  );
};
export default RepairLayout;
