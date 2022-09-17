import React from 'react';
import {Card, Space, Tabs} from 'antd';
import DatePicker from '@/components/DatePicker';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Broken from '@/pages/monitor/components/Chart/Broken';

const Network4G = () => {


  return <>
    4G网络状态
    <StepLineChart/>
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
              noFooter
              noPagination
              noRowSelection
              noSort
              rowKey="key"
              dataSource={[{'key': '1', '1': '2022-08-04 11:30:00', '2': '220'}]}
              columns={[
                {
                  title: '更新时间',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '1',
                  render: (value) => <Render text={value}/>
                }, {
                  title: '目标IP地址',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '1',
                  render: (value) => <Render text={value}/>
                },
                {
                  title: '网络状态',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '1',
                  render: (value) => <Render text={value}/>
                },
                {
                  title: '网络速率',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '1',
                  render: (value) => <Render text={value}/>
                },
                {
                  title: '网络丢包率',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '1',
                  render: (value) => <Render text={value}/>
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
