import React, {useEffect} from 'react';
import SLogin from './component';

import style from './index.module.scss';

const Login = () => {
  useEffect(() => {
    window.document.title = '感谢使用道昕智造企业数字化管理系统';
  });

  return (
    <div className={style.UserLayout}>
      <div className="dynamic-area1"/>
      <div className="dynamic-area2"/>
      <div className={style.panel}>
        <h3>登录</h3>
        <SLogin
          // loading={loading}
          className={style.warp}
          // onClick={doLogin}
        />
      </div>
    </div>
  );

};
export default Login;
