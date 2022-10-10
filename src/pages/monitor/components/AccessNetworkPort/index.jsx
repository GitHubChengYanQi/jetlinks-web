import React from 'react';
import {Space, Tabs} from 'antd';
import {createFormActions} from '@formily/antd';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Broken from '@/pages/monitor/components/Chart/Broken';
import {deviceStatusLogList} from '@/pages/monitor/url';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';

export const monitoringChart = {url: '/monitor/monitoringChart', method: 'POST'};

const formActionsPublic = createFormActions();

const AccessNetworkPort = ({device = {}}) => {

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: index % 2 === 0 ? '断' : '通'
    };
  });

  const data1 = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: Math.random() * 100,
      'title': '网络速率/Mbps'
    };
  });

  const data2 = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: Math.random() * 100,
      'title': '网络丢包率/%'
    };
  });

  const data3 = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: Math.random() * 100,
      'title': '供电电压/V'
    };
  });

  const content = () => {
    return <>
      <Table
        formActions={formActionsPublic}
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
            title: '网口',
            align: 'center',
            fixed: 'left',
            dataIndex: 'ip',
            render: (value) => <Render text='网口一'/>
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
            title: '网络速率',
            align: 'center',
            fixed: 'left',
            dataIndex: '1',
            render: (value) => <Render text="25"/>
          },
          {
            title: '网络丢包率',
            align: 'center',
            fixed: 'left',
            dataIndex: '1',
            render: (value) => <Render text="0"/>
          },
          {
            title: '供电电压',
            align: 'center',
            fixed: 'left',
            dataIndex: '1',
            render: (value) => <Render text="30"/>
          },
        ]}
        actionRender={() => {
          return <PrimaryButton>处理</PrimaryButton>;
        }}
      />
    </>;
  };

  return <>
    网络状态
    <StepLineChart data={data}/>
    网络速率/Mbps
    <BrokenLine data={data1} id="sulv"/>
    网络丢包率/%
    <BrokenLine data={data2} id="diubao"/>
    供电电压/V
    <BrokenLine data={data3} id="dianya"/>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton>报警设置</LinkButton>
        <LinkButton>导出</LinkButton>
        <LinkButton>一件处理</LinkButton>
      </Space>}
      items={[
        {
          key: '1',
          label: '网口1',
          children: content(),
        },
        {
          key: '2',
          label: '网口2',
          children: content(),
        },
        {
          key: '3',
          label: '网口3',
          children: content(),
        },
        {
          key: '4',
          label: '网口4',
          children: content(),
        },
      ]}
    />
  </>;
};

export default AccessNetworkPort;
