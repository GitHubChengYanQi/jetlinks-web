import React from 'react';
import cookie from 'js-cookie';
// import sha1 from 'sha1';
import {logger, useHistory} from 'ice';
import {useRequest} from '@/Config/BaseRequest';
import {login as loginUrl} from '@/Config/ApiUrl';
import SLogin from './component';

import style from './index.module.scss';

const Login = () => {
  const history = useHistory();
  const {request} = useRequest(loginUrl, {
    manual: true,
    throwOnError: true
  });
  const {error, loading, run} = request();

  const doLogin = async (values, err) => {
    // values.password = sha1(values.password);
    if (!err) {
      const response = await run({
        data: values
      });
      // TODO 这块代码得改
      return new Promise((resolve, reject) => {
        if (response.error) {
          const {error} = response;
          logger.error(error.message);
          resolve({
            title: '登录失败',
            message: error.message,
            type: 'error',
          });
        } else {
          logger.info(response);
          cookie.set('Authorization', response.data);
          cookie.set('Token', response.data.HeaderKey);
          setTimeout(() => {
            history.push('/overview');
          }, 1500);
          resolve({
            title: '登录成功',
            message: '登录成功，正在进入...'
          });
        }
      });
    }
  };
  return (
    <div className={style.UserLayout}>
      <div className="dynamic-area1"/>
      <div className="dynamic-area2"/>
      <div className={style.panel}>
        <h3>登录</h3>
        <SLogin
          loading={loading}
          className={style.warp}
          onClick={doLogin}/>
      </div>

    </div>
  );
};
export default Login;
