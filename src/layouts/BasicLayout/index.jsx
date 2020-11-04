import React, {useEffect} from 'react';
import cookie from 'js-cookie';
import {logger, useHistory, APP_MODE} from 'ice';
import Header from '@/layouts/BasicLayout/components/Header';
import {Alert, Spin} from 'antd';
import store from '@/store';


export default function BasicLayout({children}) {

  const history = useHistory();
  const [, dispatchers] = store.useModel('user');
  const effectsState = store.useModelEffectsState('user');

  useEffect(() => {
    window.document.title = '后台管理系统';
    try {
      let data = cookie.get('Authorization');
      if (!data) {
        throw new Error('本地登录信息不存在');
      } else {
        data = '';
      }
      const jwt = data.split('.');
      if (jwt.length !== 3 && APP_MODE === undefined) {
        throw new Error('本地登录信息错误');
      }
      dispatchers.getUserInfo();
    } catch (e) {
      logger.error(e.message);
      cookie.remove('Authorization');
      // TODO 登录超时处理
      history.push('/login');
    }
  }, []);

  return (
    <>
      {effectsState.getUserInfo.isLoading ?
        <Spin size="large">
          <Alert
            message="加载中"
            description="系统正在初始化个人信息，请稍后..."
            type="info"
            showIcon
            style={{width: 500, margin: '100px auto'}}
          />
        </Spin> :
        <div >
          <Header/>
          <div style={{height:'calc(100vh - 51px)'}}>
            {children}
          </div>
        </div>
      }
    </>
  );
}
