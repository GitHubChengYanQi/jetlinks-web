import React, {useState} from 'react';
import {Layout, Menu, Space} from 'antd';
import {useHistory, useLocation, useRouteMatch} from 'ice';
import {RightOutlined} from '@ant-design/icons';
import store from '@/store';
import Icon from '@/components/Icon';
import styles from './index.module.less';
import Empty from '@/components/Empty';

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
      <Menu.Item
        style={{borderBottom: '#435067 dotted 1px',margin:0}}
        key={item.url}
        icon={item.icon &&
        <Icon
          style={{fontSize: 16, color: mode === 'vertical' ? '#fff' : '#000'}}
          type={item.icon} />}>{item.name}
        <div style={{float: 'right'}}><RightOutlined /></div>
      </Menu.Item>
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
          style={{backgroundColor: '#2e3c56'}}
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
            disabled
            style={{
              width: '50%',
              textAlign: 'center',
              backgroundColor: '#2e3c56',
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

  if (!subMenu) {
    return <Empty />;
  }

  return (
    <Layout style={{height: '100%', backgroundColor: '#fff'}}>
      {mode === 'horizontal' && <Header theme="light" className={styles.header}>
        <div className={styles.leftMenu}>{renderLeftMenu()}</div>
        <div className={styles.rightMenu}>
          {renderRightMenu()}
        </div>
      </Header>}
      {mode === 'vertical' && <Sider className={styles.sider} width={200}>
        <div style={{height: '100%'}}>
          <div className={styles.leftLogo}>
            <Space align='center'>
              <div style={{backgroundColor: 'rgb(199 196 196)',width:4,height:16}} />
              {subMenu.name}
            </Space>
          </div>
          <div style={{maxHeight: 'calc(100% - 98px)', overflowY: 'auto'}}>
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
