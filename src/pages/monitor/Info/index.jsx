import React, {useState} from 'react';
import {Button, Descriptions, Drawer} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import style from './index.module.less';
import Save from '@/pages/monitor/Info/Save';


const Info = (props) => {

  const {id, onClose} = props;

  const dataSource = ['基础数据', '', '', ''];

  const [saveVisible, setSaveVisible] = useState(false);

  return <>
    <Drawer
      closable={false}
      width="60vw"
      placement="right"
      onClose={onClose}
      open={Boolean(id)}
    >
      <div style={{textAlign: 'right'}}>
        <Button type="link" onClick={() => setSaveVisible(true)}>报警设置</Button> <CloseOutlined onClick={onClose}/>
      </div>
      <Descriptions
        column={3}
        className={style.descriptions}
        style={{marginBottom: 24}}
        title={<div className={style.title}>基础数据</div>}
        contentStyle={{color:'#000'}}
        bordered
      >
        <Descriptions.Item label="终端备注">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备型号">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备IP地址">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="登记名称">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="GPS定位">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备MAC地址">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="设备类别">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="位置信息">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="所属客户">Cloud Database</Descriptions.Item>
      </Descriptions>

      <Descriptions
        column={2}
        className={style.descriptions}
        title={<div className={style.title}>供电数据</div>}
        bordered
      >
        <Descriptions.Item label="电网供电电压/V">12</Descriptions.Item>
        <Descriptions.Item label="控空开后电压/V">12</Descriptions.Item>
      </Descriptions>

      <div className={style.navTitle}>接入网口供电电压/V</div>

      <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
            return <Descriptions.Item label={`网口${item}`} key={index}>{item}</Descriptions.Item>;
          })
        }
      </Descriptions>


      <Descriptions
        column={3}
        className={style.descriptions}
        title={<div className={style.title}>网络数据</div>}
        style={{marginBottom: 24}}
        bordered
      >
        <Descriptions.Item label="主干网络">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Combo1">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="4G网络">Cloud Database</Descriptions.Item>
      </Descriptions>

      <div className={style.navTitle}>接入网口网络状态</div>
      <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
            return <Descriptions.Item label={`网口${item}`} key={index}>{item}</Descriptions.Item>;
          })
        }
      </Descriptions>
      <div className={style.navTitle}>接入网口网络速率</div>
      <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
            return <Descriptions.Item label={`网口${item}`} key={index}>{item}</Descriptions.Item>;
          })
        }
      </Descriptions>
      <div className={style.navTitle}>接入网口网络丢包率</div>
      <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
            return <Descriptions.Item label={`网口${item}`} key={index}>{item}</Descriptions.Item>;
          })
        }
      </Descriptions>
      <Descriptions
        column={5}
        className={style.descriptions}
        title={<div className={style.title}>环境数据</div>}
        bordered
        style={{marginBottom: 24}}
      >
        <Descriptions.Item label="温度/℃">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="湿度/%RH">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="柜门状态">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="风扇状态">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="水浸状态">Cloud Database</Descriptions.Item>
      </Descriptions>

      <Descriptions
        column={5}
        className={style.descriptions}
        title={<div className={style.title}>运行数据</div>}
        bordered
        style={{marginBottom: 24}}
      >
        <Descriptions.Item label="软件版本">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="升级时间">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="运行时间">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="上线时间">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="离线时间">Cloud Database</Descriptions.Item>
      </Descriptions>

    </Drawer>

    <Save visible={saveVisible} close={() => setSaveVisible(false)} data={{}}/>
  </>;
};

export default Info;
