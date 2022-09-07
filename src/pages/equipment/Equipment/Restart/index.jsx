import React, {useEffect, useState} from 'react';
import {Modal, Progress, Spin} from 'antd';
import style from './index.module.less';


const Restart = (props) => {

  const {
    visible,
    success = () => {
    }
  } = props;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (visible) {
      let total = 0;
      const interval = setInterval(() => {
        if (total < 100) {
          setCount(total + 20);
          total += 20;
        } else {
          success();
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [visible]);


  return <>
    <Modal
      open={visible}
      centered
      className={style.restart}
      footer={null}
      maskClosable
      closable={false}
    >
      <div className={style.content}>
        <Spin/>
        <Progress percent={count}/>
      </div>
    </Modal>
  </>;
};

export default Restart;
