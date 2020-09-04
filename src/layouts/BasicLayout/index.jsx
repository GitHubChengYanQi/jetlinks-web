import React, {useEffect} from 'react';
import cookie from 'js-cookie';
import {logger, useHistory, store, APP_MODE} from 'ice';
import {useRequest} from '@/Config/BaseRequest';
import {userInfo} from '@/Config/ApiUrl/system/user';
import Header from "@/layouts/BasicLayout/components/Header";

export default function BasicLayout({children}) {

  const history = useHistory();

  const {request: requestUser} = useRequest(userInfo, {manual: true});
  const {run: getUserInfo, data: user} = requestUser();

  const logout = () => {
    cookie.remove('Authorization');
    history.push('/user/login');
  };

  useEffect(() => {
    try {
      let data = cookie.get('Authorization');
      if (!data && APP_MODE === undefined) {
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

      getUserInfo();
    } catch (e) {
      logger.error(e.message);
      cookie.remove('Authorization');
      // TODO 登录超时处理
      // history.push('/user/login');
    }
  }, []);
  return (
    <>
      <Header/>
    </>
  );
}
