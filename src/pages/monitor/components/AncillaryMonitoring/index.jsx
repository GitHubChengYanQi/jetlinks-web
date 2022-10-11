import React, {useState} from 'react';
import {Card, Space, Tabs} from 'antd';
import {LinkButton, PrimaryButton} from '@/components/Button';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Save from '@/pages/monitor/components/BackboneNetwork/Save';
import Warning from '@/components/Warning';
import {deviceStatusLogList} from '@/pages/monitor/url';
import {createFormActions} from '@formily/antd';

const formActionsPublic = createFormActions();

// 电网供电监测
const AncillaryMonitoring = () => {

  const [saveVisible, setSaveVisible] = useState();

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}.00`,
      'value': Math.random() * 100,
      'title': '温度/℃'
    };
  });

  const content = () => {
    return <>
      <Table
        formActions={formActionsPublic}
        api={deviceStatusLogList}
        noSort
        noRowSelection
        bodyStyle={{padding: 0}}
        rowKey="logId"
        columns={[
          {
            title: '更新时间',
            align: 'center',
            fixed: 'left',
            dataIndex: 'logTime',
            render: (value) => <Render text={value}/>
          }, {
            title: '状态',
            align: 'center',
            fixed: 'left',
            dataIndex: '2',
            render: (value) => <Render className="green" text="0"/>
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
      湿度/%RH
      <BrokenLine data={data}/>
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        {/*<LinkButton onClick={() => setSaveVisible(true)}>报警设置</LinkButton>*/}
        {/*<Warning content="确定要远程重启总闸开关么?"><LinkButton>远程控制</LinkButton></Warning>*/}
        {/*<LinkButton>导出</LinkButton>*/}
        {/*<LinkButton>一件处理</LinkButton>*/}
      </Space>}
      items={[
        {
          key: '1',
          label: '温度',
          children: content()
        },
        {
          key: '2',
          label: '湿度',
          children: content()
        },
        {
          key: '3',
          label: '柜门',
          children: content()
        },
        {
          key: '4',
          label: '风扇',
          children: content()
        },
        {
          key: '5',
          label: '水浸',
          children: content()
        },
      ]}
    />

    <Save visible={saveVisible} close={() => setSaveVisible()}/>
  </>;
};

export default AncillaryMonitoring;
