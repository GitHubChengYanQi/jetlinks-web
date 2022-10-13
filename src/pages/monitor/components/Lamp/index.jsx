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
import {isArray} from '@/util/Tools';

export const deviceChartData = {url: '/device/chartData', method: 'POST'};
export const signalLampEdit = {url: '/signalLamps/edit', method: 'POST'};
export const signalLampBatchHandle = {url: '/signalLamps/batchHandle', method: 'POST'};
export const signalLampList = {url: '/signalLamps/list', method: 'POST'};

export const deviceDataM4012List = {url: '/deviceDataM4012/list', method: 'POST'};
export const deviceDataM4012BatchHandle = {url: '/deviceDataM4012/batchHandle', method: 'POST'};
export const deviceDataM4012BatchEdit = {url: '/deviceDataM4012/edit', method: 'POST'};


export const getChartTopic = {url: '/deviceModel/getChartTopic', method: 'POST'};

const formActionsPublic = createFormActions();

const Lamp = ({device = {}, date = []}) => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [passage, setPassage] = useState('east1');

  const [chartData, setChartData] = useState();

  const [types, setTypes] = useState([]);

  let listApi = {};
  let batchHandleApi = {};
  let handleApi = {};

  if (chartData) {
    switch (chartData.key) {
      case 'signalLampId':
        listApi = signalLampList;
        batchHandleApi = signalLampBatchHandle;
        handleApi = signalLampEdit;
        break;
      case 'mId':
        listApi = deviceDataM4012List;
        batchHandleApi = deviceDataM4012BatchHandle;
        handleApi = deviceDataM4012BatchEdit;
        break;
      default:
        break;
    }
  }


  const listParams = {deviceId: device.deviceId, passage, startTime: date[0], endTime: date[1]};

  const {loading, data = {}, run} = useRequest({
    ...deviceChartData,
    params: {deviceId: device.deviceId}
  }, {manual: true});

  const {loading: editLoading, run: edit} = useRequest(handleApi, {
    manual: true,
    onSuccess: () => {
      message.success('处理成功！');
      ref.current.refresh();
    }
  });

  const {loading: batchHandleLoading, run: batchHandle} = useRequest(batchHandleApi, {
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

  const {loading: getChartLoading} = useRequest({
    ...getChartTopic,
    data: {title: device.type, modelId: device.modelId}
  }, {
    onSuccess: (res) => {
      setChartData(res);
    }
  });

  useEffect(() => {
    if (date.length > 0) {
      run({data: {startTime: date[0], endTime: date[1], deviceId: device.deviceId, title: device.type}});
    }
  }, [date]);

  if (loading || getChartLoading) {
    return <PageSkeleton type="descriptions"/>;
  }

  if (!chartData) {
    return <></>;
  }

  const getMax = (array = []) => {
    let max = 0;
    array.forEach(item => {
      if (max < item.value) {
        max = item.value;
      }
    });
    return max;
  };

  const sort = (array = [], lines) => {

    const linesArray = lines.map(lintItem => {
      return array.filter(item => item.title === lintItem.lineTitle);
    });
    const newArray = [];
    linesArray.forEach(lintItems => {
      lintItems.forEach((item) => {
        newArray.push(item);
      });
    });
    return newArray;
  };

  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
    >
      {
        isArray(chartData.messages).map((item, index) => {
          const lines = item.lines || [];
          return <div key={index}>
            {item.title}
            <BrokenLine
              data={sort(data[item.key] || [], lines)}
              colors={lines.map(item => item.color)}
              id={item.key}
              // max={parseInt(getMax(data.voltage || []) * 0.8, 0) || 0}
              // min={parseInt(getMax(data.voltage || []) * 0.2, 0) || 0}
            />
          </div>;
        })
      }
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        <LinkButton loading={deviceLoading} onClick={() => setSaveVisible(deviceDetail)}>报警设置</LinkButton>
        <Warning
          content="确定一键处理吗?"
          onOk={() => batchHandle({data: {deviceId: device.deviceId}})}>
          <LinkButton>一件处理</LinkButton>
        </Warning>
        {/* <LinkButton>导出</LinkButton> */}
      </Space>}
      activeKey={passage}
      onTabClick={(key) => {
        setPassage(key);
        run({
          data: {
            startTime: date[0],
            endTime: date[1],
            deviceId: device.deviceId,
            passage: key,
            title: device.type
          }
        });
      }}
      items={types.map((item) => {
        return {
          key: item,
          label: item,
        };
      })}
    />
    <Table
      loading={editLoading || batchHandleLoading}
      isModal
      ref={ref}
      onResponse={(res) => {
        setTypes(res.search || []);
      }}
      formSubmit={(values) => {
        return {...listParams, ...values, title: device.type};
      }}
      formActions={formActionsPublic}
      api={listApi}
      noSort
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey={chartData.key}
      columns={isArray(chartData.columns).map(item => {
        return {
          title: item.columns,
          align: 'center',
          dataIndex: item.key,
          render: (value) => <Render>{value}</Render>
        };
      })}
      actionRender={(value, record) => {
        const handle = record.handle;
        return <Warning
          disabled={handle}
          content="确定处理吗？"
          onOk={() => edit({data: {[`${chartData.key}s`]: [record[chartData.key]]}})}>
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
