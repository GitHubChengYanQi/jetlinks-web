import React, {useEffect} from 'react';
import {Row, Col} from 'antd';
import SLogin from './component';

import style from './index.module.scss';
import loginLogo from '../../asseset/imgs/loginLogo.png';

const Login = () => {
  useEffect(() => {
    window.document.title = '感谢使用道昕智造企业数字化管理系统';
  });

  return (
    <div className={style.UserLayout}>
      <div className={style.panel}>
        <Row style={{height: '100%'}}>
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
