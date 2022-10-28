import React, {useEffect, useRef} from 'react';
import {Space} from 'antd';
import Modal from '@/components/Modal';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';
import {isArray} from '@/util/Tools';

const Control = (
  {
    onClose,
    visible,
    data = [],
  }
) => {

  const ref = useRef();

  useEffect(() => {
    if (visible) {
      ref.current.open(true);
    } else {
      ref.current.close();
    }
  }, [visible]);

  return <>
    <Modal headTitle="远程控制" ref={ref} onClose={onClose}>
      <div style={{padding: 24}}>
        <Space direction="vertical" style={{width: '100%'}}>
          {
            isArray(data).map((item, index) => {
              return <div key={index}>
                <Warning content={item.content}>
                  <PrimaryButton style={{width: '100%'}} key={index}>{item.text}</PrimaryButton>
                </Warning>
              </div>;
            })
          }
        </Space>
      </div>
    </Modal>
  </>;
};


export default Control;
