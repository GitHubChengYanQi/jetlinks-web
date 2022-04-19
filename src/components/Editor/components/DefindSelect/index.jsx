import React, {useRef, useState} from 'react';
import {Button, Card, message, Space, Spin, Typography} from 'antd';
import {CheckOutlined, PlusOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';
import Defined from '@/components/Editor/components/Defined';

const style = {
  margin: 8,
  textAlign: 'center',
  padding: '8px 16px',
  width: '100%',
};


const DefindSelect = ({
  button,
}) => {

  const grid = (text) => {
    return <Card.Grid style={style}>
      <Typography.Text copyable={{
        icon: [<div style={{color: '#000'}}>{text}</div>, <Space>已复制 <CheckOutlined /></Space>],
        text: `\${{${text}}}`,
        tooltips: false,
      }} level={5} style={{margin: 0}} />
    </Card.Grid>;
  };

  const definedRef = useRef();

  const addVar = useRef();

  const {loading: listLoading, data, refresh} = useRequest({url: '/contractTemplete/list', method: 'POST'});

  const {loading: addLoading, run} = useRequest({url: '/contractTemplete/add', method: 'POST'}, {
    manual: true,
    onSuccess: (res) => {
      refresh();
    }
  });

  if (listLoading) {
    return <Spin />;
  }

  if (!data) {
    return <></>;
  }

  return <div>
    <ProCard
      className="h2Card"
      title="合同约定条款变量"
      bodyStyle={{padding: 0}}
      extra={<Button onClick={() => {
        definedRef.current.open(true);
      }}><PlusOutlined />添加自定义变量</Button>}>
      {
        data.map((item, index) => {
          const checked = item.name === button;
          return <div key={index} style={{width: '22%', display: 'inline-block', margin: 8}}>
            {grid(item.name)}
          </div>;
        })
      }
    </ProCard>

    <Modal
      width={800}
      ref={definedRef}
      headTitle="添加自定义变量"
      footer={<Space>
        <Button
          loading={addLoading}
          type="primary"
          onClick={() => {
            const res = addVar.current.save();
            if (!res.name) {
              return message.warn('请输入标题!');
            }
            run({
              data: res
            });
          }}
        >保存
        </Button>
        <Button onClick={() => {
          definedRef.current.close();
        }}>取消</Button>
      </Space>}
    >
      <Defined
        ref={addVar}
      />
    </Modal>
  </div>;
};

export default DefindSelect;
