import React from 'react';
import {Descriptions, Drawer} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import style from './index.module.less';

const Info = (props) => {

  const {id, onClose} = props;

  return <>
    <Drawer
      closable={false}
      width={1000}
      placement="right"
      onClose={onClose}
      visible={Boolean(id)}
    >
      <div style={{textAlign: 'right'}}>
        <CloseOutlined onClick={onClose}/>
      </div>
      <Descriptions
        column={2}
        className={style.descriptions}
        title={
          <div className={style.header}>
            <div className={style.title}>
              设备信息
            </div>
          </div>
        }
      >
        <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="登记名称">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备类别">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备型号">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="所属客户">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备MAC地址">Cloud Database</Descriptions.Item>
      </Descriptions>

      <Descriptions
        column={2}
        className={style.descriptions}
        title={
          <div className={style.header}>
            <div className={style.title}>
              入库信息
            </div>
          </div>
        }
      >
        <Descriptions.Item label="入库人员">李子木</Descriptions.Item>
        <Descriptions.Item label="入库时间">2022-07-28 12:00:00</Descriptions.Item>
      </Descriptions>

      <Descriptions
        column={2}
        className={style.descriptions}
        title={
          <div className={style.header}>
            <div className={style.title}>
              物联网卡信息
            </div>
          </div>
        }
      >
        <Descriptions.Item label="物联网卡号">898604901920C0300890</Descriptions.Item>
        <Descriptions.Item label="使用套餐">300M流量池</Descriptions.Item>
        <Descriptions.Item label="激活状态">已激活</Descriptions.Item>
        <Descriptions.Item label="已用流量">12</Descriptions.Item>
        <Descriptions.Item label="费用状态">正常</Descriptions.Item>
        <Descriptions.Item label="剩余流量">288</Descriptions.Item>
        <Descriptions.Item label="信号强度">30</Descriptions.Item>
        <Descriptions.Item label="上线时间">2022-07-28 12:00:00</Descriptions.Item>
        <Descriptions.Item label="离线时间">2022-07-28 12:00:00</Descriptions.Item>
      </Descriptions>
    </Drawer>
  </>;
};

export default Info;
