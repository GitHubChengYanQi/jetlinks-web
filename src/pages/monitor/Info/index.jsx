import React, {useState} from 'react';
import {Descriptions} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import moment from 'moment';
import style from './index.module.less';
import {useRequest} from '@/util/Request';
import {deviceDetail} from '@/pages/equipment/Equipment/url';
import Render from '@/components/Render';


const Info = ({
  deviceId
}) => {

  const [data, setData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  const [otherData, setOtherData] = useState([]);

  const {loading} = useRequest(
    {...deviceDetail, data: {deviceId}},
    {
      onSuccess: (res) => {
        setData(res);
        setNetworkData((res.cals || []).filter(item => item.children.length <= 0));
        setOtherData((res.cals || []).filter(item => item.children.length > 0));
      }
    }
  );

  const online = data.status === 'online';

  if (loading) {
    return <PageSkeleton/>;
  }

  const runTime = () => {
    if (!online) {
      return <Render width={150}/>;
    }
    const oldsecond = moment(new Date()).diff(data.logTime, 'second');
    const day = Math.floor(oldsecond / 86400) || 0;
    const hours = Math.floor((oldsecond % 86400) / 3600) || 0;
    const minutes = Math.floor(((oldsecond % 86400) % 3600) / 60) || 0;
    const newsecond = Math.floor(((oldsecond % 86400) % 3600) % 60) || 0;
    return <> {day}天{hours}时{minutes}分{newsecond}秒</>;
  };

  return <>
    <Descriptions
      column={3}
      className={style.descriptions}
      style={{marginBottom: 24}}
      title={<div className={style.title}>基础数据</div>}
      contentStyle={{color: '#000'}}
      bordered
    >
      <Descriptions.Item label="终端备注">{data.remarks}</Descriptions.Item>
      <Descriptions.Item label="设备型号">{data.modelName}</Descriptions.Item>
      <Descriptions.Item label="设备IP地址">{data.ip || '-'}</Descriptions.Item>
      <Descriptions.Item label="登记名称">{data.name || '-'}</Descriptions.Item>
      <Descriptions.Item label="GPS定位">{data.ip || '-'}</Descriptions.Item>
      <Descriptions.Item label="设备MAC地址">{data.mac || '-'}</Descriptions.Item>
      <Descriptions.Item label="设备类别">{data.categoryName || '-'}</Descriptions.Item>
      <Descriptions.Item label="位置信息">{data.ip || '-'}</Descriptions.Item>
      <Descriptions.Item label="所属客户">{data.customerName || '-'}</Descriptions.Item>
    </Descriptions>

    <Descriptions
      column={3}
      className={style.descriptions}
      title={<div className={style.title}>发布数据</div>}
      bordered
    >
      {
        networkData.map((item, index) => {
          const value = typeof item.value === 'object' ? '' : item.value;
          return <Descriptions.Item
            key={index}
            label={item.title}>
            {value || '-'}
          </Descriptions.Item>;
        })
      }
    </Descriptions>

    {
      otherData.map((item, index) => {
        const children = item.children || [];
        return <div key={index}>
          <div className={style.navTitle}>{item.title}</div>

          <Descriptions column={3} bordered className={style.descriptions} style={{marginBottom: 24}}>
            {
              children.map((item, index) => {
                const value = typeof item.value === 'object' ? '' : item.value;
                return <Descriptions.Item
                  key={index}
                  label={item.title}>
                  {value || '-'}
                </Descriptions.Item>;
              })
            }
          </Descriptions>
        </div>;
      })
    }


    {/* <Descriptions */}
    {/*   column={3} */}
    {/*   className={style.descriptions} */}
    {/*   title={<div className={style.title}>网络数据</div>} */}
    {/*   style={{marginBottom: 24}} */}
    {/*   bordered */}
    {/* > */}
    {/*   <Descriptions.Item label="主干网络">-</Descriptions.Item> */}
    {/*   <Descriptions.Item label="Combo1">-</Descriptions.Item> */}
    {/*   <Descriptions.Item label="4G网络">-</Descriptions.Item> */}
    {/* </Descriptions> */}

    {/* <div className={style.navTitle}>接入网口网络状态</div> */}
    {/* <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}> */}
    {/*   { */}
    {/*     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => { */}
    {/*       return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>; */}
    {/*     }) */}
    {/*   } */}
    {/* </Descriptions> */}
    {/* <div className={style.navTitle}>接入网口网络速率</div> */}
    {/* <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}> */}
    {/*   { */}
    {/*     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => { */}
    {/*       return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>; */}
    {/*     }) */}
    {/*   } */}
    {/* </Descriptions> */}
    {/* <div className={style.navTitle}>接入网口网络丢包率</div> */}
    {/* <Descriptions column={6} bordered className={style.descriptions} style={{marginBottom: 24}}> */}
    {/*   { */}
    {/*     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => { */}
    {/*       return <Descriptions.Item label={`网口${item}`} key={index}>-</Descriptions.Item>; */}
    {/*     }) */}
    {/*   } */}
    {/* </Descriptions> */}
    {/* <Descriptions */}
    {/*   column={5} */}
    {/*   className={style.descriptions} */}
    {/*   title={<div className={style.title}>环境数据</div>} */}
    {/*   bordered */}
    {/*   style={{marginBottom: 24}} */}
    {/* > */}
    {/*   <Descriptions.Item label="温度/℃">-</Descriptions.Item> */}
    {/*   <Descriptions.Item label="湿度/%RH">-</Descriptions.Item> */}
    {/*   <Descriptions.Item label="柜门状态">-</Descriptions.Item> */}
    {/*   <Descriptions.Item label="风扇状态">-</Descriptions.Item> */}
    {/*   <Descriptions.Item label="水浸状态">-</Descriptions.Item> */}
    {/* </Descriptions> */}

    <Descriptions
      column={5}
      className={style.descriptions}
      title={<div className={style.title}>运行数据</div>}
      bordered
      style={{marginBottom: 24}}
    >
      <Descriptions.Item label="软件版本">{data.ip || '-'}</Descriptions.Item>
      <Descriptions.Item label="升级时间">{data.ip || '-'}</Descriptions.Item>
      <Descriptions.Item label="运行时间">{runTime() || '-'}</Descriptions.Item>
      <Descriptions.Item label="上线时间">{online ? (data.logtime || '-') : '-'}</Descriptions.Item>
      <Descriptions.Item label="离线时间">{!online ? (data.logtime || '-') : '-'}</Descriptions.Item>
    </Descriptions>


  </>;
};

export default Info;
