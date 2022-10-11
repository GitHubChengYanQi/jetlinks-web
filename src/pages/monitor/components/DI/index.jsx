import React, {useState} from 'react';
import {Card, Space, Tabs} from 'antd';
import {createFormActions} from '@formily/antd';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import Warning from '@/components/Warning';
import Save from '@/pages/monitor/components/BackboneNetwork/Save';
import {deviceStatusLogList} from '@/pages/monitor/url';

const formActionsPublic = createFormActions();

// 主干网络检测
const DI = () => {

  const [saveVisible, setSaveVisible] = useState();

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      value: index>12 ? 10 : 5
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
            title: 'DI值',
            align: 'center',
            fixed: 'left',
            dataIndex: 'ip',
            render: (value) => <Render text='DI值'/>
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
      DI
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
          label: 'DI1',
          children: content()
        }, {
          key: '2',
          label: 'DI2',
          children: content()
        },{
          key: '3',
          label: 'DI3',
          children: content()
        },{
          key: '4',
          label: 'DI4',
          children: content()
        },
      ]}
    />

    <Save visible={saveVisible} close={() => setSaveVisible()}/>
  </>;
};

export default DI;
