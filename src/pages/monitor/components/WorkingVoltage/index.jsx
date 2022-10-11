import React from 'react';
import {Space, Tabs} from 'antd';
import {createFormActions} from '@formily/antd';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Broken from '@/pages/monitor/components/Chart/Broken';
import {deviceStatusLogList} from '@/pages/monitor/url';

export const monitoringChart = {url: '/monitor/monitoringChart', method: 'POST'};

const formActionsPublic = createFormActions();

const WorkingVoltage = ({device = {}}) => {

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: index % 2 === 0 ? '正常' : '断开'
    };
  });

  const data1 = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: Math.random()*100
    };
  });

  return <>
    工作电压状态/V
    <StepLineChart data={data}/>

    <Tabs
      tabBarExtraContent={<Space>
        {/*<LinkButton>报警设置</LinkButton>*/}
        {/*<LinkButton>导出</LinkButton>*/}
        {/*<LinkButton>一件处理</LinkButton>*/}
      </Space>}
      items={[
        {
          key: '1',
          label: '历史数据',
          children: <>
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
                },
                {
                  title: '工作电压状态',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: 'type',
                  render: (value) => <Render
                    className={value === 'online' ? 'green' : 'red'}
                    text={value === 'online' ? '正常' : '断开'}
                  />
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

export default WorkingVoltage;
