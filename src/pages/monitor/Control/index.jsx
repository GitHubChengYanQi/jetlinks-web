import React, {useEffect, useRef} from 'react';
import {message, Space, Spin} from 'antd';
import Modal from '@/components/Modal';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';
import {isArray} from '@/util/Tools';
import {useRequest} from '@/util/Request';

const buttonSubmit = {url: '/device/buttonSubmit', method: 'POST'};

const Control = (
  {
    onClose,
    visible,
    data = [],
    MAC,
  }
) => {

  const ref = useRef();

  const {loading, run} = useRequest(buttonSubmit, {
    manual: true,
    onSuccess: () => {
      message.success('操作成功！');
    },
    onError: () => {
      message.error('操作失败！');
    }
  });

  useEffect(() => {
    if (visible) {
      ref.current.open(true);
    } else {
      ref.current.close();
    }
  }, [visible]);

  return <>
    <Modal headTitle="远程控制" ref={ref} onClose={onClose}>
      <Spin spinning={loading}>
        <div style={{padding: 24}}>
          <Space size={12} direction="vertical" style={{width: '100%'}}>
            {
              isArray(data).map((item, index) => {
                return <div key={index}>
                  <Warning content={`确定控制${item.title}？`} onOk={() => run({data: {MAC, buttonData: {key: item.key}}})}>
                    <PrimaryButton style={{width: '100%'}} key={index}>{item.title}</PrimaryButton>
                  </Warning>
                </div>;
              })
            }
          </Space>
        </div>
      </Spin>
    </Modal>
  </>;
};


export default Control;
