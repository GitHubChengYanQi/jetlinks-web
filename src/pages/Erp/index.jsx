import React, {useRef, useState} from 'react';
import {Menu} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import StorehouseList from '@/pages/Erp/storehouse/StorehouseList';
import SetView from '@/layouts/SetView';
import Modal from '@/components/Modal';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const ref = useRef(null);

  const RenderComponent = () => {
    switch (type) {
      case 'ckgl':
        return <StorehouseList />;
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
          <Menu.Item key="ckgl">
            <span>仓库管理</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>} />
      <Modal width={1000} title='设置' footer={[]} ref={ref}>{RenderComponent()}</Modal>
    </>
  );
};


const ErpLayout = ({children}) => {
  return (
    <TopLayout rightMenu={RightMenu}>
      {children}
    </TopLayout>
  );
};
export default ErpLayout;
