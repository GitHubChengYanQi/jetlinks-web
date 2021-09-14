import React, {useState} from 'react';
import {Menu, Modal} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import OriginList from '@/pages/Crm/origin/OriginList';
import TemplateList from '@/pages/Crm/template/TemplateList';
import CrmCustomerLevelList from '@/pages/Crm/customer/crmCustomerLevel/crmCustomerLevelList';
import CrmIndustryList from '@/pages/Crm/crmIndustry/crmIndustryList';
import CrmBusinessSalesList from '@/pages/Crm/business/crmBusinessSales/crmBusinessSalesList';
import CompanyRoleList from '@/pages/Crm/companyRole/companyRoleList';
import SetView from '@/layouts/SetView';
import DataClassificationList from '@/pages/Crm/data/dataClassification/dataClassificationList';
import SpeechcraftTypeList from '@/pages/Crm/speechcraft/speechcraftType/speechcraftTypeList';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const [visible, showModel] = useState(false);

  const RenderComponent = () => {
    switch (type) {
      case 'sjly':
        return <OriginList />;
      case 'sslc':
        return <CrmBusinessSalesList />;
      case 'htmb':
        return <TemplateList />;
      case 'khjb':
        return <CrmCustomerLevelList />;
      case 'hygl':
        return <CrmIndustryList />;
      case 'jsgl':
        return <CompanyRoleList />;
      case 'cpzl':
        return <DataClassificationList />;
      case 'hsfl':
        return <SpeechcraftTypeList />;
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
            showModel(true);
          }}
        >
          <Menu.Item key="sjly">
            <span>商机来源管理</span>
          </Menu.Item>
          <Menu.Item key="sslc">
            <span>销售流程管理</span>
          </Menu.Item>
          <Menu.Item key="htmb">
            <span>合同模板管理</span>
          </Menu.Item>
          <Menu.Item key="khjb">
            <span>客户级别管理</span>
          </Menu.Item>
          <Menu.Item key="hygl">
            <span>行业管理</span>
          </Menu.Item>
          <Menu.Item key="jsgl">
            <span>角色管理</span>
          </Menu.Item>
          <Menu.Item key="cpzl">
            <span>产品资料分类管理</span>
          </Menu.Item>
          <Menu.Item key="hsfl">
            <span>话术分类管理</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>} />
      <Modal centered destroyOnClose maskClosable={false} width={860} visible={visible} onCancel={() => {
        showModel(false);
      }} footer={null}>{RenderComponent()}</Modal>
    </>
  );
};

const CrmLayout = ({children}) => {

  return (
    <TopLayout rightMenu={RightMenu}>
      {children}
    </TopLayout>
  );
};
export default CrmLayout;
