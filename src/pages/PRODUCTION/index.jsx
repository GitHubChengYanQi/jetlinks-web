import React, {useRef, useState} from 'react';
import {Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import BrandList from '@/pages/Erp/brand/BrandList';
import MaterialList from '@/pages/Erp/material/MaterialList';
import StorehouseList from '@/pages/Erp/storehouse/StorehouseList';
import UnitList from '@/pages/Erp/unit/unitList';
import ItemClassList from '@/pages/Erp/itemClass/itemClassList';
import SetView from '@/layouts/SetView';
import CategoryList from '@/pages/Erp/category/categoryList';
import CodingRulesList from '@/pages/Erp/codingRules/codingRulesList';
import ToolClassificationList from '@/pages/Erp/tool/components/toolClassification/toolClassificationList';
import SpuClassificationList from '@/pages/Erp/spu/components/spuClassification/spuClassificationList';
import Modal from '@/components/Modal';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const ref = useRef(null);

  const RenderComponent = () => {
    switch (type) {
      case 'gjflgl':
        return <ToolClassificationList />;
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
          <Menu.Item key="gjflgl">
            <span>工具分类管理</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>} />
      <Modal width={860} title='设置' footer={[]} ref={ref}>{RenderComponent()}</Modal>
    </>
  );
};


const ProducttionLayout = ({children}) => {
  return (
    <TopLayout rightMenu={RightMenu}>
      {children}
    </TopLayout>
  );
};
export default ProducttionLayout;
