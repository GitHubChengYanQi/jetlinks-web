import React, {useState} from 'react';
import {AlertOutlined, BellOutlined, CloseCircleOutlined, MessageOutlined} from '@ant-design/icons';
import {Button, Drawer, Select, Space} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useRequest} from '@/util/Request';
import Empty from '@/components/Empty';
import Commission from '@/layouts/BasicLayout/components/Header/components/Commission';

const Message = () => {

  const {loading, data, run} = useRequest({url: '/message/list', method: 'POST'}, {manual: true});

  const [visible, setVisible] = useState(false);

  const [key, setKey] = useState('2');

  const content = () => {
    switch (key) {
      case '0':
        return <Empty />;
      case '1':
        return <Empty />;
      case '2':
        return <Commission onClose={()=>{setVisible(false);}} data={data} />;
      default:
        break;
    }
  };

  const title = () => {
    return <Select
      value={key}
      style={{width: 100}}
      bordered={false}
      options={[
        {
          value: '0',
          label: <Space><MessageOutlined />消息</Space>,
        },
        {
          value: '1',
          label: <Space><BellOutlined />通知</Space>,
        },
        {
          value: '2',
          label: <Space><AlertOutlined />待办</Space>,
        },
      ]}
      onChange={(value) => {
        setKey(value);
        switch (value) {
          case '0':
            break;
          case '1':
            break;
          case '2':
            run();
            break;
          default:
            break;
        }
      }}
    />;
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        icon={<BellOutlined />}
        style={{height: 60, color: '#FFF'}}
        onClick={() => {
          setVisible(true);
        }}
      />

      <Drawer
        closable={false}
        destroyOnClose
        afterVisibleChange={()=>{
          run();
        }}
        extra={<Button
          type="link"
          onClick={() => {
            setVisible(false);
          }}
          icon={<CloseCircleOutlined />}
        />}
        style={{marginTop: 60}}
        bodyStyle={{padding: 0,marginBottom:'5vh'}}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        title={title()}
      >
        {
          loading
            ?
            <ProSkeleton type="descriptions" />
            :
            content()
        }
      </Drawer>
    </>
  );
};

export default Message;
