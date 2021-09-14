import React from 'react';
import {Button, Card, Divider, Space} from 'antd';
import store from '@/store';

const Nav = () => {

  const [userInfo] = store.useModel('user');

  return (
    <Card title="快速开始 / 便捷导航">
      <Space split={<Divider type="vertical" />} wrap>
        {
          userInfo && userInfo.menus && userInfo.menus.map((items, index) => {
            return (<Button type="text" style={{width:80}} key={index} onClick={() => {
              history.push(`/${items.id}`);
            }}>
              {items.name}
            </Button>);
          })
        }
      </Space>
    </Card>
  );
};

export default Nav;
