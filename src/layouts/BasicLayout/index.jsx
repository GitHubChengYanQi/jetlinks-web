import React, { useEffect } from 'react';
import cookie from 'js-cookie';
import { logger, useHistory, APP_MODE } from 'ice';
import Header from '@/layouts/BasicLayout/components/Header';
import { Alert, Spin, Layout } from 'antd';
import store from '@/store';
import Footer from '@/layouts/BasicLayout/components/Footer';

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

export default function BasicLayout({ children }) {

  const history = useHistory();
  const [state, dispatchers] = store.useModel('user');

  useEffect(() => {
    window.document.title = '后台管理系统';
    try {
      const data = cookie.get('tianpeng-token');
      if (!data) {
        throw new Error('本地登录信息不存在');
      }
      const jwt = data.split('.');
      if (jwt.length !== 3) {
        throw new Error('本地登录信息错误');
      }
      dispatchers.getUserInfo();
    } catch (e) {
      logger.error(e.message);
      cookie.remove('tianpeng-token');
      // TODO 登录超时处理
      history.push('/login');
    }
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
            style={{ width: 500, margin: '100px auto' }}
          />
        </Spin> :
        <>
          <Header/>
          <Content className="web-content">
            {children}
          </Content>
        </>
      }
    </>
  );
}
