import React, {useState} from 'react';
import {Button, Descriptions, Drawer} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import style from './index.module.less';
import Save from '@/pages/monitor/Info/Save';


const Info = (props) => {

  const {id, onClose} = props;

  const dataSource = ['基础数据', '供电数据', '网络数据', '环境数据'];

  const [saveVisible, setSaveVisible] = useState(false);

  return <>
    <Drawer
      closable={false}
      width={1000}
      placement="right"
      onClose={onClose}
      visible={Boolean(id)}
    >
      <div style={{textAlign: 'right'}}>
        <Button type='link' onClick={() => setSaveVisible(true)}>报警设置</Button> <CloseOutlined onClick={onClose} />
      </div>
      {
        dataSource.map((item, index) => {
          return <Descriptions
            key={index}
            className={style.descriptions}
            title={
              <div className={style.title}>
                {item}
              </div>
            }
            bordered
          >
            <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
            <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
            <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
            <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
            <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
          </Descriptions>;
        })
      }
    </Drawer>

    <Save visible={saveVisible} close={() => setSaveVisible(false)} data={{}} />
  </>;
};

export default Info;
