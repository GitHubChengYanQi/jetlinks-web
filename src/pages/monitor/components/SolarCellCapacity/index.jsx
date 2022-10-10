import React, {useState} from 'react';
import {Card, Space, Tabs} from 'antd';
import {LinkButton, PrimaryButton} from '@/components/Button';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Save from '@/pages/monitor/components/BackboneNetwork/Save';
import {deviceStatusLogList} from '@/pages/monitor/url';
import {createFormActions} from '@formily/antd';

const formActionsPublic = createFormActions();

// 电网供电监测
const SolarCellCapacity = () => {

  const [saveVisible, setSaveVisible] = useState();

  const data = new Array(25).fill('').map((item, index) => {
    return {
      'time': `${index}:00`,
      'value': Math.random()*100,
      'title': '太阳能电压'
    };
  });

  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
    >
      太阳能电池容量/AH
      <BrokenLine data={data}/>
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton onClick={()=>setSaveVisible(true)}>报警设置</LinkButton>
        <LinkButton>导出</LinkButton>
        <LinkButton>一件处理</LinkButton>
      </Space>}
      items={[
        {
          key: '1',
          label: '历史数据',
          children: <>
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
                  title: '太阳能电池容量AH',
                  align: 'center',
                  fixed: 'left',
                  dataIndex: '2',
                  render: (value) => <Render className="green" text='0'/>
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

    <Save visible={saveVisible} close={() => setSaveVisible()}/>
  </>;
};

export default SolarCellCapacity;
