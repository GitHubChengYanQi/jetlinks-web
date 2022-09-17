import React, {useState} from 'react';
import {Descriptions} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import style from './index.module.less';
import Save from '@/pages/monitor/Info/Save';
import {useRequest} from '@/util/Request';
import {deviceDetail} from '@/pages/equipment/Equipment/url';


const Info = ({
  deviceId
}) => {

  const {loading, data = {}} = useRequest({...deviceDetail, data: {deviceId}});
  console.log(data);
  const [saveVisible, setSaveVisible] = useState(false);

  if (loading) {
    return <PageSkeleton/>;
  }

  return <>
    <Descriptions
      column={3}
      className={style.descriptions}
      style={{marginBottom: 24}}
      title={<div className={style.title}>基础数据</div>}
      contentStyle={{color: '#000'}}
      bordered
    >
      <Descriptions.Item label="终端备注">-</Descriptions.Item>
      <Descriptions.Item label="设备型号">-</Descriptions.Item>
      <Descriptions.Item label="设备IP地址">-</Descriptions.Item>
      <Descriptions.Item label="登记名称">-</Descriptions.Item>
      <Descriptions.Item label="GPS定位">-</Descriptions.Item>
      <Descriptions.Item label="设备MAC地址">-</Descriptions.Item>
      <Descriptions.Item label="设备类别">-</Descriptions.Item>
      <Descriptions.Item label="位置信息">-</Descriptions.Item>
      <Descriptions.Item label="所属客户">-</Descriptions.Item>
    </Descriptions>

    <Descriptions
      column={2}
      className={style.descriptions}
      title={<div className={style.title}>供电数据</div>}
      bordered
    >
      <Descriptions.Item label="电网供电电压/V">-</Descriptions.Item>
      <Descriptions.Item label="控空开后电压/V">-</Descriptions.Item>
    </Descriptions>

    <div className={style.navTitle}>接入网口供电电压/V</div>

    <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
          return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>;
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
      <Descriptions.Item label="主干网络">-</Descriptions.Item>
      <Descriptions.Item label="Combo1">-</Descriptions.Item>
      <Descriptions.Item label="4G网络">-</Descriptions.Item>
    </Descriptions>

    <div className={style.navTitle}>接入网口网络状态</div>
    <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
          return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>;
        })
      }
    </Descriptions>
    <div className={style.navTitle}>接入网口网络速率</div>
    <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
          return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>;
        })
      }
    </Descriptions>
    <div className={style.navTitle}>接入网口网络丢包率</div>
    <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
          return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>;
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
      <Descriptions.Item label="温度/℃">-</Descriptions.Item>
      <Descriptions.Item label="湿度/%RH">-</Descriptions.Item>
      <Descriptions.Item label="柜门状态">-</Descriptions.Item>
      <Descriptions.Item label="风扇状态">-</Descriptions.Item>
      <Descriptions.Item label="水浸状态">-</Descriptions.Item>
    </Descriptions>

    <Descriptions
      column={5}
      className={style.descriptions}
      title={<div className={style.title}>运行数据</div>}
      bordered
      style={{marginBottom: 24}}
    >
      <Descriptions.Item label="软件版本">-</Descriptions.Item>
      <Descriptions.Item label="升级时间">-</Descriptions.Item>
      <Descriptions.Item label="运行时间">-</Descriptions.Item>
      <Descriptions.Item label="上线时间">-</Descriptions.Item>
      <Descriptions.Item label="离线时间">-</Descriptions.Item>
    </Descriptions>

    <Save visible={saveVisible} close={() => setSaveVisible(false)} data={{}}/>
  </>;
};

export default Info;
