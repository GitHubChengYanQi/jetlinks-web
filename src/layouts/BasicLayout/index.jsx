import React, {useEffect} from 'react';
import cookie from 'js-cookie';
import {logger, useHistory} from 'ice';
import {Alert, Spin} from 'antd';
import store from '@/store';

import TopLayout from '@/layouts/TopLayout';

export default function BasicLayout({children}) {

  const history = useHistory();
  const [state, dispatchers] = store.useModel('user');
  const dataDispatchers = store.useModel('dataSource')[1];

  const Initialize = async () => {
    window.document.title = '奥普泰设备业务云平台';
    try {
      const token = cookie.get('jetlink-token');
      if (!token) {
        throw new Error('本地登录信息不存在');
      }
      const jwt = token.split('.');
      if (jwt.length !== 3) {
        throw new Error('本地登录信息错误');
      }
      dispatchers.getUserInfo();
      dataDispatchers.getCommonArea();
      dataDispatchers.getDeviceClass();
    } catch (e) {
      logger.error(e.message);
      cookie.remove('jetlink-token');
      // TODO 登录超时处理
      history.push('/login');
    }
  };

  useEffect(() => {
    Initialize();
  }, []);

  return (
    <>
      {Object.keys(state).length === 0 ?
        <Spin size="large">
          <Alert
            message="加载中"
            description="系统正在初始化个人信息，请稍后..."
            type="info"
            showIcon
            style={{width: 500, margin: '100px auto'}}
          />
        </Spin> :
        <>
          {/* <Header /> */}
          <TopLayout className="web-content">
            {children}
          </TopLayout>
        </>
      }
    </>
  );
}
