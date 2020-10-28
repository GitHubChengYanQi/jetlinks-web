import React, {useEffect} from 'react';
import cookie from 'js-cookie';
import {logger, useHistory, APP_MODE} from 'ice';
import Header from '@/layouts/BasicLayout/components/Header';
import {Spin} from 'antd';
import store from '@/store';

console.log(store);

export default function BasicLayout({children}) {

  const history = useHistory();
  const [state, dispatchers] = store.useModel('user');
  const effectsState = store.useModelEffectsState('user');

  const logout = () => {
    cookie.remove('Authorization');
    history.push('/user/login');
  };

  useEffect(() => {
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
      if (jwt.length === 3) {
        console.log(window.atob(jwt[0]));
        const user = window.atob(jwt[1]);

        console.log(user);
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
      {effectsState.getUserInfo.isLoading ? <Spin size="large"/> :
        <Header/>}
    </>
  );
}
