import React from 'react';
import {Space, Tabs} from 'antd';
import {createFormActions} from '@formily/antd';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import {PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import {deviceStatusLogList} from '@/pages/monitor/url';

const formActionsPublic = createFormActions();

const ChannelControl = ({device = {}}) => {

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: index % 2 === 0 ? '开启' : '关闭'
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
            render: (value) => <Render text='通道一'/>
          },
          {
            title: '供电状态',
            align: 'center',
            fixed: 'left',
            dataIndex: 'type',
            render: (value) => <Render
              className={value === 'online' ? 'green' : 'red'}
              text={value === 'online' ? '开启' : '关闭'}
            />
          },
        ]}
        actionRender={() => {
          return <PrimaryButton>处理</PrimaryButton>;
        }}
      />
    </>;
  };

  return <>
    供电状态
    <StepLineChart data={data}/>

    <Tabs
      tabBarExtraContent={<Space>
        {/*<Warning content="确定要远程重启总闸开关么?"><LinkButton>远程控制</LinkButton></Warning>*/}
        {/*<LinkButton>导出</LinkButton>*/}
        {/*<LinkButton>一件处理</LinkButton>*/}
      </Space>}
      items={[
        {
          key: '1',
          label: '通道1',
          children: content()
        },
        {
          key: '2',
          label: '通道2',
          children: content()
        },
        {
          key: '3',
          label: '通道3',
          children: content()
        },
        {
          key: '4',
          label: '通道14',
          children: content()
        },
      ]}
    />
  </>;
};

export default ChannelControl;
