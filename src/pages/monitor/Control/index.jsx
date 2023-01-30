import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {message, Space, Spin} from 'antd';
import Modal from '@/components/Modal';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';
import {isArray, queryString} from '@/util/Tools';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';

const buttonSubmit = {url: '/device/buttonSubmit', method: 'POST'};

export const OuntDown = ({item, run, MAC}) => {
  const [count, setCount] = useState(120);
  const [isShow, setShow] = useState(false);

  const TimeRef = useRef();
  const hClick = () => {
    setShow(true);
    TimeRef.current = setInterval(() => {
      setCount(count => {
        if (count === 0) {
          // 清除定时器
          clearInterval(TimeRef.current);
          // 启用按钮
          setShow(false);
          setCount(120);
        }
        return count - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(TimeRef.current);
    };
  });

  return <div>
    <Warning content={`确定控制${item.title}？`} onOk={() => {
      run({data: {MAC, buttonData: {key: item.key}}}).then(() => {
        hClick();
      });
    }}>
      <PrimaryButton
        disabled={isShow}
        style={{width: '100%'}}
      >
        {isShow ? `${count}秒后再试` : item.title}
      </PrimaryButton>
    </Warning>
  </div>;
};

const Control = (
  {
    onClose,
    visible,
    data = [],
    MAC,
    search = [],
  }, ref
) => {

  const modalRef = useRef();

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

  const submit = (key) => {
    run({data: {MAC, buttonData: {key}}});
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  useEffect(() => {
    if (visible) {
      if (search.length <= 0) {
        setButtons(isArray(data));
      }
      modalRef.current.open(true);
    } else {
      modalRef.current.close();
    }
  }, [visible]);

  return <>
    <Modal destroyOnClose={false} headTitle="远程控制" ref={modalRef} onClose={onClose}>
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
                  {/* <OuntDown item={item} run={run} MAC={MAC} /> */}
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


export default React.forwardRef(Control);
