import React, {useRef, useState} from 'react';
import {Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import BrandList from '@/pages/Erp/brand/BrandList';
import MaterialList from '@/pages/Erp/material/MaterialList';
import UnitList from '@/pages/Erp/unit/unitList';
import ItemClassList from '@/pages/Erp/itemClass/itemClassList';
import SetView from '@/layouts/SetView';
import CategoryList from '@/pages/Erp/category/categoryList';
import ToolClassificationList from '@/pages/Erp/tool/components/toolClassification/toolClassificationList';
import SpuClassificationList from '@/pages/Erp/spu/components/spuClassification/spuClassificationList';
import Modal from '@/components/Modal';
import PrintTemplateList from '@/pages/SPU/printTemplate/printTemplateList';
import SpuTable from '@/pages/Erp/spu/components/spuClassification/spuTable';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const ref = useRef(null);

  const RenderComponent = () => {
    switch (type) {
      case 'lmgl':
        return <CategoryList />;
      case 'ppgl':
        return <BrandList />;
      case 'czgl':
        return <MaterialList />;
      case 'dymb':
        return <PrintTemplateList />;
      case 'dwgl':
        return <UnitList />;
      case 'gjflgl':
        return <ToolClassificationList />;
      case 'wlfl':
        return <SpuClassificationList type={1} />;
      case 'cpgl':
        return <SpuTable />;
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
            ref.current.open(false);
            setType(item.key);
          }}
        >
          <Menu.Item key="lmgl">
            <span>配置管理</span>
          </Menu.Item>
          <Menu.Item key="ppgl">
            <span>品牌管理</span>
          </Menu.Item>
          <Menu.Item key="czgl">
            <span>材质管理</span>
          </Menu.Item>
          <Menu.Item key="dwgl">
            <span>单位管理</span>
          </Menu.Item>
          <Menu.Item key="wlfl">
            <span>分类管理</span>
          </Menu.Item>
          <Menu.Item key="cpgl">
            <span>产品管理</span>
          </Menu.Item>
          <Menu.Item key="dymb">
            <span>打印模板</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>} />
      <Modal width={1000} title="设置" footer={[]} ref={ref}>{RenderComponent()}</Modal>
    </>
  );
};


const SpuLayout = ({children}) => {
  return (
    <TopLayout rightMenu={RightMenu}>
      {children}
    </TopLayout>
  );
};
export default SpuLayout;
