import React, {useEffect, useRef, useState} from 'react';
import {Card, message, Space, Tabs} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import {createFormActions} from '@formily/antd';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import {useRequest} from '@/util/Request';
import Save from '@/pages/monitor/Info/Save';
import {monitorDetail} from '@/pages/monitor/url';
import Warning from '@/components/Warning';

export const signalLamp = {url: '/signalLamp/getChart', method: 'POST'};
export const signalLampEdit = {url: '/signalLamp/edit', method: 'POST'};
export const signalLampList = {url: '/signalLamp/list', method: 'POST'};

const formActionsPublic = createFormActions();

const Lamp = ({device = {}, date = []}) => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [passage, setPassage] = useState('east1');

  const [types, setTypes] = useState([]);

  const listParams = {deviceId: device.deviceId, passage, startTime: date[0], endTime: date[1]};

  const {loading, data = {}, run} = useRequest({...signalLamp, data: {deviceId: device.deviceId}}, {manual: true});
  const {loading: editLoading, run: edit} = useRequest({
    ...signalLampEdit,
    data: {deviceId: device.deviceId}
  }, {
    manual: true,
    onSuccess: () => {
      message.success('处理成功！');
      ref.current.refresh();
    }
  });

  const {loading: deviceLoading, data: deviceDetail, refresh} = useRequest({
    ...monitorDetail,
    data: {deviceId: device.deviceId, modelId: device.modelId}
  });

  useEffect(() => {
    if (date.length > 0) {
      run({data: {startTime: date[0], endTime: date[1], deviceId: device.deviceId}});
    }
  }, [date]);

  const colors = ['#e5250c', '#25cc34', '#e7c20d'];

  if (loading) {
    return <PageSkeleton type="descriptions" />;
  }

  const type = (value) => {
    switch (value) {
      case 'east1':
        return <span>通道1</span>;
      case 'east2':
        return <span>通道2</span>;
      case 'north7':
        return <span>通道3</span>;
      case 'north8':
        return <span>通道4</span>;
      case 'south5':
        return <span>通道5</span>;
      case 'south6':
        return <span>通道5</span>;
      case 'west3':
        return <span>通道6</span>;
      case 'west4':
        return <span>通道7</span>;
      default:
        return <span>通道7</span>;
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
      {type(passage)}电压/V
      <BrokenLine
        data={sort(data.voltage || [])}
        colors={colors}
        id="tddy"
        max={parseInt(getMax(data.voltage || []) * 0.8, 0) || 0}
        min={parseInt(getMax(data.voltage || []) * 0.2, 0) || 0}
      />
      {type(passage)}电流/A
      <BrokenLine
        data={sort(data.electricCurrent || [])}
        colors={colors}
        id="tddl"
        max={parseInt(getMax(data.electricCurrent || []) * 0.8, 0) || 0}
      />
      {type(passage)}功率/W
      <BrokenLine
        data={sort(data.power || [])}
        colors={colors}
        id="tdgl"
        max={parseInt(getMax(data.power || []) * 0.8, 0) || 0}
        min={parseInt(getMax(data.power || []) * 0.2, 0) || 0}
      />
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton loading={deviceLoading} onClick={() => setSaveVisible(deviceDetail)}>报警设置</LinkButton>
        <Warning content="确定一键处理吗?"><LinkButton>一件处理</LinkButton></Warning>
        {/* <LinkButton>导出</LinkButton> */}
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
      loading={editLoading}
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
          render: (value) => <Render text={value} />
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
        const handle = record.handle;
        return <Warning
          disabled={handle}
          content="确定处理吗？"
          onOk={() => edit({data: {signalLampIds: [record.signalLampId]}})}>
          <PrimaryButton disabled={handle}>{handle ? '已查看' : '处理'}</PrimaryButton>
        </Warning>;
      }}
    />

    <Save
      visible={saveVisible}
      close={() => setSaveVisible()}
      device={saveVisible}
      success={() => {
        setSaveVisible();
        refresh();
      }}
    />


  </>;
};

export default Lamp;
