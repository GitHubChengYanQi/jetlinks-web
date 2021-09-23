import React, {useEffect} from 'react';
import {Row,Col} from 'antd';
import cookie from 'js-cookie';
// import sha1 from 'sha1';
import SLogin from './component';

import style from './index.module.scss';
import loginLogo from '../../asseset/imgs/loginLogo.png';

const Login = () => {
  useEffect(() => {
    window.document.title = '系统登录';
  });

  return (
    <div className={style.UserLayout}>
      <div className={style.panel}>
        <Row style={{height:'100%'}}>
          <Col span={12} offset={12} className={style.loginPanel}>
            <div className={style.form}>
              <h3><img src={loginLogo} alt="logo" /></h3>
              <SLogin
                // loading={loading}
                className={style.warp}
                // onClick={doLogin}
              />
            </div>
          </Col>
        </Row>

      </div>
    </div>
  );

};
export default Login;
