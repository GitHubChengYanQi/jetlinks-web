import React, {useRef, useState} from 'react';
import {Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import SetView from '@/layouts/SetView';
import SupplierBlacklistList from '@/pages/Crm/supplierBlacklist/supplierBlacklistList';
import Modal from '@/components/Modal';
import TaxRateList from '@/pages/Purshase/taxRate/taxRateList';
import CrmCustomerLevelList from '@/pages/Crm/customer/crmCustomerLevel/crmCustomerLevelList';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);

  const ref = useRef();

  const RenderComponent = () => {
    switch (type) {
      case 'hmd':
        return <SupplierBlacklistList />;
      case 'slgl':
        return <TaxRateList />;
      default:
        return null;
    }
  };

  return (
    <>
      <SetView
        mode={mode}
        theme={theme}
        width={width}
        RenderComponent={RenderComponent}
        buttons={buttons}
        SetMenu={<Menu
          selectable={false}
          style={{width: '100%'}}
          onClick={(item) => {
            setType(item.key);
            ref.current.open(true);
          }}
        >
          <Menu.Item key="slgl">
            <span>税率管理</span>
          </Menu.Item>
          <Menu.Item key="hmd">
            <span>黑名单管理</span>
          </Menu.Item>
        </Menu>} />
      <Modal footer={[]} width={1200} ref={ref}>{RenderComponent()}</Modal>
    </>
  );
};

const PurshaseLayout = ({children}) => {
  return (
    <TopLayout
      rightMenu={RightMenu}
    >
      {children}
    </TopLayout>
  );
};
export default PurshaseLayout;
