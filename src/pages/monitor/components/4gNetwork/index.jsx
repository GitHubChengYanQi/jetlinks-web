import React from 'react';
import {Space, Tabs} from 'antd';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Broken from '@/pages/monitor/components/Chart/Broken';
import {deviceStatusLogList} from '@/pages/monitor/url';
import {useRequest} from '@/util/Request';

export const monitoringChart = {url: '/monitor/monitoringChart', method: 'POST'};

const Network4G = ({device = {}}) => {

  const {loading, data} = useRequest({...monitoringChart, data: {deviceId: device.deviceId}});
  // console.log(data);


  return <>
    {/* 4G网络状态 */}
    {/* <StepLineChart/> */}
    4G信号强度
    <Broken/>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton>报警设置</LinkButton>
        <LinkButton>导出</LinkButton>
        <LinkButton>一件处理</LinkButton>
      </Space>}
      items={[
        {
          key: '1',
          label: '历史数据',
          children: <>
            <Table
              bodyStyle={{padding: 0}}
              api={deviceStatusLogList}
              noSort
              noRowSelection
              rowKey="logId"
              columns={[
                {
                  title: '更新时间',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: 'logTime',
                  render: (value) => <Render text={value}/>
                }, {
                  title: 'IP地址',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: 'ip',
                  render: (value) => <Render text={value}/>
                },
                {
                  title: '网络状态',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: 'type',
                  render: (value) => <Render
                    className={value === 'online' ? 'green' : 'red'}
                    text={value === 'online' ? '通' : '断'}
                  />
                },
                {
                  title: '信号强度',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '1',
                  render: (value) => <Render text="-"/>
                },
              ]}
              actionRender={() => {
                return <PrimaryButton>处理</PrimaryButton>;
              }}
            />
          </>
        }
      ]}
    />
  </>;
};

export default Network4G;
