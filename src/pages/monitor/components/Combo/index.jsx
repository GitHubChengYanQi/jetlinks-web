import React, {useState} from 'react';
import {Card, Space, Tabs} from 'antd';
import DatePicker from '@/components/DatePicker';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import Warning from '@/components/Warning';
import Save from '@/pages/monitor/components/BackboneNetwork/Save';
import {deviceStatusLogList} from '@/pages/monitor/url';
import {createFormActions} from '@formily/antd';

const formActionsPublic = createFormActions();

// 主干网络检测
const Combo = () => {

  const [saveVisible, setSaveVisible] = useState();

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: index % 2 === 0 ? '断' : '通'
    };
  });

  const content = () => {
    return <>
      <Table
        formActions={formActionsPublic}
        api={deviceStatusLogList}
        noSort
        bodyStyle={{padding: 0}}
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
            title: 'Combo口',
            align: 'center',
            fixed: 'left',
            dataIndex: 'ip',
            render: (value) => <Render text='Combo'/>
          },
          {
            title: '连接方式',
            align: 'center',
            fixed: 'left',
            dataIndex: '1',
            render: (value) => <Render className="green" text='光连接'/>
          },
          {
            title: '网络状态',
            align: 'center',
            fixed: 'left',
            dataIndex: '1',
            render: (value) => <Render className="green" text='up'/>
          },
        ]}
        actionRender={() => {
          return <PrimaryButton>处理</PrimaryButton>;
        }}
      />
    </>;
  };

  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
    >
      Combo1网络状态
      <StepLineChart data={data}/>
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        {/*<Warning content="确定要远程重启总闸开关么?"><LinkButton>远程控制</LinkButton></Warning>*/}
        {/*<LinkButton>一件处理</LinkButton>*/}
        {/*<LinkButton>导出</LinkButton>*/}
      </Space>}
      items={[
        {
          key: '1',
          label: 'Combo1',
          children: content()
        }, {
          key: '2',
          label: 'Combo2',
          children: content()
        },
      ]}
    />

    <Save visible={saveVisible} close={() => setSaveVisible()}/>
  </>;
};

export default Combo;
