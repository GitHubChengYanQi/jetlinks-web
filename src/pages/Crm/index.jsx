import React, {useRef, useState} from 'react';
import {useRouteMatch, useHistory} from 'ice';
import store from '@/store';
import {Drawer, Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import Icon from '@/components/Icon';

import styles from './index.module.scss';
import Modal2 from '@/components/Modal';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import OriginList from '@/pages/Crm/origin/OriginList';
import TemplateList from '@/pages/Crm/template/TemplateList';
import CrmCustomerLevelList from '@/pages/Crm/crmCustomerLevel/crmCustomerLevelList';
import CrmIndustryList from '@/pages/Crm/crmIndustry/crmIndustryList';
import CrmBusinessSalesList from '@/pages/Crm/crmBusinessSales/crmBusinessSalesList';
import CrmBusinessSalesProcessList from '@/pages/Crm/crmBusinessSalesProcess/crmBusinessSalesProcessList';

const CrmLayout = ({children}) => {

  const refOriginList = useRef(null);
  const refTemplateList = useRef(null);
  const refCrmCustomerLevelList = useRef(null);
  const refCrmIndustryList = useRef(null);
  const refCrmBusinessSalesList = useRef(null);
  const refCrmBusinessSalesProcessList = useRef(null);


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
        }}><Icon type="icon-xitongpeizhi" /></Menu.Item>
      </Menu>
    );
  };

  if (!subMenu) {
    return <div>菜单不存在</div>;
  }




  return (
    <TopLayout leftMenu={renderLeftMenu(subMenu.subMenus)} rightMenu={rightMenu()}>
      {children}
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
            style={{width: '100%'}}
          >
            <Menu.Item  onClick={() => {refOriginList.current.open(false);}}>
              <span className={styles.dropdownMenuItem}>商机来源管理</span>
            </Menu.Item>
            <Modal2 title="商机来源" width={800} component={OriginList} ref={refOriginList} />

            <Menu.Item  onClick={() => {refCrmBusinessSalesList.current.open(false);}}>
              <span className={styles.dropdownMenuItem}>销售流程管理</span>
            </Menu.Item>
            <Modal2 title="商机来源" width={800} component={CrmBusinessSalesList} ref={refCrmBusinessSalesList} />


            <Menu.Item  onClick={() => {refCrmBusinessSalesProcessList.current.open(false);}}>
              <span className={styles.dropdownMenuItem}>流程明细管理</span>
            </Menu.Item>
            <Modal2 title="商机来源" width={800} component={CrmBusinessSalesProcessList} ref={refCrmBusinessSalesProcessList} />

            <Menu.Item  onClick={() => {refOriginList.current.open(false);}}>
              <span className={styles.dropdownMenuItem}>商机来源管理</span>
            </Menu.Item>
            <Modal2 title="商机来源" width={800} component={OriginList} ref={refOriginList} />

            <Menu.Item  onClick={() => {refTemplateList.current.open(false);}}>
              <span className={styles.dropdownMenuItem}>合同模板管理</span>
            </Menu.Item>
            <Modal2 title="合同模板" width={800} component={TemplateList} ref={refTemplateList} />

            <Menu.Item onClick={() => {refCrmCustomerLevelList.current.open(false);}}>
              <span className={styles.dropdownMenuItem} >客户级别管理</span>
            </Menu.Item>
            <Modal2 title="客户级别" width={800} component={CrmCustomerLevelList} ref={refCrmCustomerLevelList} />

            <Menu.Item onClick={() => {refCrmIndustryList.current.open(false);}}>
              <span className={styles.dropdownMenuItem} >行业管理</span>
            </Menu.Item>
            <Modal2 title="行业" width={800} component={CrmIndustryList} ref={refCrmIndustryList} />

            <Menu.Divider />
          </Menu>
        </div>
      </Drawer>
    </TopLayout>
  );
};
export default CrmLayout;
