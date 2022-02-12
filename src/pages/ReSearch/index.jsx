import React, {useState} from 'react';
import {Menu, Modal} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import SetView from '@/layouts/SetView';
import ShipSetpClassList from '@/pages/ReSearch/shipSetp/shipSetpClass/shipSetpClassList';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const [visible, showModel] = useState(false);

  const RenderComponent = () => {
    switch (type) {
      case 'gxfl':
        return <ShipSetpClassList />;
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
          <Menu.Item key="gxfl">
            <span>工序分类</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>} />
      <Modal centered destroyOnClose maskClosable={false} width={860} visible={visible} onCancel={() => {
        showModel(false);
      }} footer={null}>{RenderComponent()}</Modal>
    </>
  );
};

const ReSeachLayout = ({children}) => {
  return (
    <TopLayout rightMenu={RightMenu}>
      {children}
    </TopLayout>
  );
};
export default ReSeachLayout;
