import React, {useEffect, useRef, useState} from 'react';
import {Card, Input, Space, Tabs} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import {createFormActions} from '@formily/antd';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Save from '@/pages/monitor/components/BackboneNetwork/Save';
import {useRequest} from '@/util/Request';
import FormItem from '@/components/Table/components/FormItem';

export const signalLamp = {url: '/signalLamp/getChart', method: 'POST'};
export const signalLampList = {url: '/signalLamp/list', method: 'POST'};

const formActionsPublic = createFormActions();

const Lamp = ({device = {}, date = []}) => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [passage, setPassage] = useState('east1');

  const [types, setTypes] = useState([]);

  const listParams = {deviceId: device.deviceId, passage,startTime:date[0],endTime:date[1]};

  const {loading, data = {}, run} = useRequest({...signalLamp, data: {deviceId: device.deviceId}}, {manual: true});

  useEffect(() => {
    if (date.length > 0) {
      run({data: {startTime: date[0], endTime: date[1], deviceId: device.deviceId}});
    }
  }, [date]);

  const colors = ['#e5250c', '#25cc34', '#e7c20d'];

  if (loading) {
    return <PageSkeleton type="descriptions"/>;
  }

  const type = (value) => {
    switch (value) {
      case 'east1':
        return <div>通道1</div>;
      case 'east2':
        return <div>通道2</div>;
      case 'north7':
        return <div>通道3</div>;
      case 'north8':
        return <div>通道4</div>;
      case 'south5':
        return <div>通道5</div>;
      case 'south6':
        return <div>通道5</div>;
      case 'west3':
        return <div>通道6</div>;
      case 'west4':
        return <div>通道7</div>;
      default:
        return <div>通道7</div>;
    }
  };

  const getMax = (array = []) => {
    let max = 0;
    array.forEach(item => {
      if (max < item.value) {
        max = item.value;
      }
    });
    return max;
  };

  const sort = (array = []) => {
    const red = [];
    const green = [];
    const yellow = [];
    array.forEach(item => {
      switch (item.title) {
        case '红灯':
          red.push(item);
          break;
        case '绿灯':
          green.push(item);
          break;
        case '黄灯':
          yellow.push(item);
          break;
        default:
          break;
      }
    });
    return [...red, ...green, ...yellow];
  };

  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
    >
      通道电压/V
      <BrokenLine
        data={sort(data.voltage || [])}
        colors={colors}
        id="tddy"
        max={parseInt(getMax(data.voltage || []) * 0.8, 0)}
        min={parseInt(getMax(data.voltage || []) * 0.2, 0)}
      />
      通道电流/A
      <BrokenLine
        data={sort(data.electricCurrent || [])}
        colors={colors}
        id="tddl"
        max={parseInt(getMax(data.electricCurrent || []) * 0.8, 0)}
      />
      通道功率/W
      <BrokenLine
        data={sort(data.power || [])}
        colors={colors}
        id="tdgl"
        max={parseInt(getMax(data.power || []) * 0.8, 0)}
        min={parseInt(getMax(data.power || []) * 0.2, 0)}
      />
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton onClick={() => setSaveVisible(true)}>报警设置</LinkButton>
        <LinkButton>一件处理</LinkButton>
        <LinkButton>导出</LinkButton>
      </Space>}
      activeKey={passage}
      onTabClick={(key) => {
        setPassage(key);
        run({data: {startTime: date[0], endTime: date[1], deviceId: device.deviceId, passage: key}});
      }}
      items={types.map((item) => {
        return {
          key: item,
          label: type(item),
        };
      })}
    />
    <Table
      isModal
      ref={ref}
      onResponse={(res) => {
        setTypes(res.search);
      }}
      formSubmit={(values) => {
        return {...listParams, ...values,};
      }}
      formActions={formActionsPublic}
      api={signalLampList}
      noSort
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey="signalLampId"
      columns={[
        {
          title: '更新时间',
          align: 'center',
          fixed: 'left',
          dataIndex: 'updateTime',
          render: (value) => <Render text={value}/>
        }, {
          title: '通道',
          align: 'center',
          fixed: 'left',
          dataIndex: 'passage',
          render: (value) => {
            return type(value);
          }
        },
        {
          title: '灯具',
          align: 'center',
          fixed: 'left',
          dataIndex: 'lamp',
          render: (value) => <Render className="green">{value}</Render>
        },
        {
          title: '电压',
          align: 'center',
          fixed: 'left',
          dataIndex: 'voltage',
          render: (value) => <Render className="green">{value}</Render>
        },
        {
          title: '电流',
          align: 'center',
          fixed: 'left',
          dataIndex: 'electricCurrent',
          render: (value) => <Render className="green">{value}</Render>
        },
        {
          title: '功率',
          align: 'center',
          fixed: 'left',
          dataIndex: 'power',
          render: (value) => <Render className="green">{value}</Render>
        },
        {
          title: '灯具状态',
          align: 'center',
          fixed: 'left',
          dataIndex: 'lampStatus',
          render: (value) => <Render className="green">{value}</Render>
        },
      ]}
      actionRender={(value, record) => {
        return <PrimaryButton>处理</PrimaryButton>;
      }}
    />

    <Save visible={saveVisible} close={() => setSaveVisible()}/>
  </>;
};

export default Lamp;
