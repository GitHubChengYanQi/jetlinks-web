import React, {useImperativeHandle, useState} from 'react';
import {Descriptions} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import moment from 'moment';
import style from './index.module.less';
import {useRequest} from '@/util/Request';
import Render from '@/components/Render';
import {deviceData, monitorDetail} from '@/pages/monitor/url';
import Save from '@/pages/monitor/Info/Save';
import {isArray} from '@/util/Tools';
import classNames from 'classnames';


const Info = ({
  deviceId,
  modelId,
  open = () => {
  },
}, ref) => {

  const [data, setData] = useState({});
  const [otherData, setOtherData] = useState([]);

  const [saveVisible, setSaveVisible] = useState();

  const {loading, refresh} = useRequest(
    {...monitorDetail, data: {deviceId, modelId}},
    {
      onSuccess: (res) => {
        setData(res);
      }
    }
  );

  const {loading: otherDataLoading} = useRequest(
    {...deviceData, data: {deviceId, modelId}},
    {
      onSuccess: (res) => {
        setOtherData(isArray(res));
      }
    }
  );

  const online = data.status === 'online';

  const openAlarm = () => {
    setSaveVisible(data);
  };

  useImperativeHandle(ref, () => ({
    openAlarm,
  }));

  if (loading || otherDataLoading) {
    return <PageSkeleton/>;
  }

  const runTime = () => {
    if (!online) {
      return <Render width={150} text="-"/>;
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
      // style={{marginBottom: 24}}
      title={<div className={style.title}>基础数据</div>}
      contentStyle={{color: '#000'}}
      bordered
    >
      <Descriptions.Item label="终端备注">{data.remarks || '-'}</Descriptions.Item>
      <Descriptions.Item label="设备型号">{data.modelName}</Descriptions.Item>
      <Descriptions.Item label="设备IP地址">{data.ip || '-'}</Descriptions.Item>
      <Descriptions.Item label="登记名称">{data.name || '-'}</Descriptions.Item>
      <Descriptions.Item label="GPS定位">-</Descriptions.Item>
      <Descriptions.Item label="设备MAC地址">{data.mac || '-'}</Descriptions.Item>
      <Descriptions.Item label="设备类别">{data.categoryName || '-'}</Descriptions.Item>
      <Descriptions.Item label="位置信息">-</Descriptions.Item>
      <Descriptions.Item label="所属客户">{data.customerName || '-'}</Descriptions.Item>
    </Descriptions>


    {
      otherData.map((item, index) => {
        const content = [];
        const datas = isArray(item.data);
        const childrens = isArray(item.childrens);
        let column = 0;
        datas.forEach(item => {
          column = item.length;
          item.forEach(item => {
            content.push(item);
          });
        });
        return <div key={index}>
          <Descriptions
            key={index}
            column={column}
            className={classNames(content.length === 0 && style.noBorder, style.otherDescriptions)}
            title={<div className={style.title}>{item.title}</div>}
            contentStyle={{color: '#000'}}
            style={{marginTop: 24}}
            bordered
          >
            {
              content.map((contentItem, contentIndex) => {
                const values = (contentItem.value || '').split(',');
                return <Descriptions.Item
                  key={contentIndex}
                  label={contentItem.key}>
                  {
                    values.map((valueItem, valueIndex) => {
                      return <div
                        key={valueIndex}
                        className={style.value}
                        style={{borderRight: valueIndex === values.length - 1 && 'none', cursor: 'pointer'}}
                        onClick={() => {
                          if (contentItem.title) {
                            open(contentItem.title);
                          }
                        }}
                      >
                        {valueItem || '-'}
                      </div>;
                    })
                  }
                </Descriptions.Item>;
              })
            }
          </Descriptions>
          {
            childrens.map((childrenItem, childrenIndex) => {
              const childrenDatas = isArray(childrenItem.data);
              const childrenContent = [];
              childrenDatas.forEach(dataItem => {
                dataItem.forEach(childrenContentItem => {
                  childrenContent.push(childrenContentItem);
                });
              });
              return <div key={childrenIndex} style={{width: `${childrenItem.width || 100}%`,display:'inline-block'}}>
                <div
                  className={style.navTitle}
                  style={{textAlign: childrenItem.align || 'center'}}
                >
                  {childrenItem.title}
                </div>
                <Descriptions
                  column={6}
                  bordered
                  className={style.otherDescriptions}
                >
                  {
                    childrenContent.map((contentItem, contentIndex) => {
                      const values = (contentItem.value || '').split(',');
                      return <Descriptions.Item key={contentIndex} label={contentItem.key}>
                        {
                          values.map((valueItem, valueIndex) => {
                            return <div
                              key={valueIndex}
                              className={style.value}
                              style={{borderRight: valueIndex === values.length - 1 && 'none', cursor: 'pointer'}}
                              onClick={() => {
                                if (contentItem.title) {
                                  open(contentItem.title);
                                }
                              }}
                            >
                              {valueItem || '-'}
                            </div>;
                          })
                        }
                      </Descriptions.Item>;
                    })
                  }
                </Descriptions>
              </div>;
            })
          }
        </div>;
      })
    }

    <Descriptions
      column={5}
      className={style.descriptions}
      title={<div className={style.title}>运行数据</div>}
      bordered
      style={{marginTop: 24}}
    >
      <Descriptions.Item label="软件版本">-</Descriptions.Item>
      <Descriptions.Item label="升级时间">-</Descriptions.Item>
      <Descriptions.Item label="运行时间">{runTime() || '-'}</Descriptions.Item>
      <Descriptions.Item label="上线时间">{online ? (data.logTime || '-') : '-'}</Descriptions.Item>
      <Descriptions.Item label="离线时间">{!online ? (data.logTime || '-') : '-'}</Descriptions.Item>
    </Descriptions>

    <Save
      visible={saveVisible}
      close={() => setSaveVisible()}
      device={saveVisible}
      success={() => {
        setSaveVisible();
        refresh();
      }}
    />

  </>;
};

export default React.forwardRef(Info);
