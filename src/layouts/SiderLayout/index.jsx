import React from 'react';
import {Row, Col} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars-2';

import style from './index.module.less';

const SiderLayout = ({children,left}) => {

  return (
    <div className="baseSystem-workspace-section">
      <div className="baseSystem-tab-content">
        <div className="baseSystem-portal-view">
          <Row
            justify="center"
            className={style.main}
          >
            <Col
              xl={5}
              style={{
                position: 'sticky',
                top:0,
                height: 'calc(100vh - 51px)',
              }}>
              <div className={style.leftWarp}>
                <Scrollbars
                  autoHide
                  autoHideTimeout={500}
                  className="Scroller">
                  <Row className="sidebar">
                    <Col span={21}>
                      {left}
                    </Col>
                  </Row>

                </Scrollbars>

              </div>
            </Col>
            <Col
              xl={19}>
              <div className={style.contentContainer}>{children}</div>

            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SiderLayout;
