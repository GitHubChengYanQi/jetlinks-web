import React from 'react';
import {Row, Col} from 'antd';

import style from './index.module.less';

// const {Header, Footer, Sider, Content} = Layout;

const BaseSystem = ({children}) => {

  return (
    <div className="baseSystem-workspace-section">
      <div className="baseSystem-tab-content">
        <div className="baseSystem-portal-view">
          <Row
            justify="center"
            className={style.main}
          >
            <Col
              xl={6}
              style={{
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                left: 0,
              }}>
              2222
            </Col>
            <Col
              xl={18}>222
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BaseSystem;
