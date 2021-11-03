import React, {useRef, useState} from 'react';
import {Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import SetView from '@/layouts/SetView';
import ToolClassificationList from '@/pages/Erp/tool/components/toolClassification/toolClassificationList';
import Modal from '@/components/Modal';
import QualityCheckClassificationList from '@/pages/Erp/qualityCheck/components/qualityCheckClassification/qualityCheckClassificationList';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const ref = useRef(null);

  const RenderComponent = () => {
    switch (type) {
      case 'gjflgl':
        return <ToolClassificationList />;
      case 'zjflgl':
        return <QualityCheckClassificationList />;
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
          <Menu.Item key="zjflgl">
            <span>质检分类管理</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>} />
      <Modal width={860} title="设置" footer={[]} ref={ref}>{RenderComponent()}</Modal>
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
