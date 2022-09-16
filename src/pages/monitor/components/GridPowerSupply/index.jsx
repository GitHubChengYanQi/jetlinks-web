import React from 'react';
import {Card, Space, Tabs} from 'antd';
import DatePicker from '@/components/DatePicker';
import {LinkButton, PrimaryButton} from '@/components/Button';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';
import Table from '@/components/Table';
import Render from '@/components/Render';

// 电网供电监测
const GridPowerSupply = () => {
  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
      extra={<DatePicker RangePicker/>}
    >
      <BrokenLine/>
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton>报警设置</LinkButton>
        <LinkButton>远程控制</LinkButton>
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
                  title: '电网供电电压',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '2',
                  render: (value) => <Render className="green" text={value}/>
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

export default GridPowerSupply;
