import React, {useEffect, useRef, useState} from 'react';
import {message, Space, Spin} from 'antd';
import Modal from '@/components/Modal';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';
import {isArray, queryString} from '@/util/Tools';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';

const buttonSubmit = {url: '/device/buttonSubmit', method: 'POST'};

const Control = (
  {
    onClose,
    visible,
    data = [],
    MAC,
    search = [],
  }
) => {

  const ref = useRef();

  const [buttons, setButtons] = useState([]);

  const [searchValue, setSearchValue] = useState();

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
      if (search.length <= 0) {
        setButtons(isArray(data));
      }
      ref.current.open(true);
    } else {
      ref.current.close();
    }
  }, [visible]);

  return <>
    <Modal headTitle="远程控制" ref={ref} onClose={onClose}>
      <Spin spinning={loading}>
        <div style={{padding: 24}}>
          {search.length > 0 && <Select
            value={searchValue}
            placeholder="筛选"
            style={{marginBottom: 16}}
            options={search.map(item => ({label: item, value: item}))}
            onChange={(value) => {
              const newButtons = isArray(data).filter(item => queryString(value, item.title));
              setButtons(newButtons);
              setSearchValue(value);
            }}
          />}
          <Space size={12} direction="vertical" style={{width: '100%'}}>
            {
              buttons.map((item, index) => {
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
