import React, {useRef, useState} from 'react';
import {useRouteMatch, useHistory} from 'ice';
import store from '@/store';
import {Drawer, Menu, Modal} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import Icon from "@/components/Icon";
import styles from "@/pages/Crm/index.module.scss";
import BrandList from "@/pages/Erp/brand/BrandList";
import MaterialList from "@/pages/Erp/material/MaterialList";
import StockList from "@/pages/Erp/stock/StockList";

const ErpLayout = ({children}) => {

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
      case 'ppgl':
        return <BrandList />;
      case 'czgl':
        return <MaterialList />;
      case 'ckgl':
        return <StockList />;
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
              <Menu.Item key="ppgl">
                <span>品牌管理</span>
              </Menu.Item>
              <Menu.Item key="czgl">
                <span>材质管理</span>
              </Menu.Item>
              <Menu.Item key="ckgl">
                <span>仓库管理</span>
              </Menu.Item>
              <Menu.Divider />
            </Menu>
            <Modal centered destroyOnClose maskClosable={false} width={860} visible={visible} onCancel={()=>{
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
export default ErpLayout;
