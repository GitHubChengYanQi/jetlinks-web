import React, {useRef, useState} from 'react';
import {useRouteMatch, useHistory} from 'ice';
import store from '@/store';
import {Drawer, Menu, Modal} from 'antd';
import TopLayout from '@/layouts/TopLayout';
import BannerDifferenceList from '@/pages/Portal/bannerDifference/bannerDifferenceList';
import NavigationDifferenceList from '@/pages/Portal/navigationDifference/navigationDifferenceList';
import RemindList from '@/pages/Portal/remind/remindList';
import SetView from '@/layouts/SetView';


const RightMenu = ({mode = 'horizontal', theme, width = '50%', buttons = []}) => {

  const [type, setType] = useState(null);
  const [visible, showModel] = useState(false);

  const RenderComponent = () => {
    switch (type) {
      case 'lbtfl':
        return <BannerDifferenceList />;
      case 'dhfl':
        return <NavigationDifferenceList />;
      case 'shtx':
        return <RemindList />;
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

        </Menu>} />
      <Modal centered destroyOnClose maskClosable={false} width={860} visible={visible} onCancel={() => {
        showModel(false);
      }} footer={null}>{RenderComponent()}</Modal>
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
