import React, {useEffect, useRef, useState} from 'react';
import {Card, Input, message, Space, Tabs} from 'antd';
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
import FormItem from '@/components/Table/components/FormItem';

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

  const [type, setType] = useState();

  const [saveVisible, setSaveVisible] = useState();

  const [search, setSearch] = useState();

  const [chartData, setChartData] = useState();

  const [searchs, setSearchs] = useState([]);
  const [updateSearch, setUpdateSearch] = useState();

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

  const listParams = {deviceId: device.deviceId, startTime: date[0], endTime: date[1]};

  const {loading: getChartLoading, run: getChartTopicRun} = useRequest({
    ...getChartTopic,
    data: {title: device.type, modelId: device.modelId}
  }, {
    onSuccess: (res) => {
      if (res.search && !search) {
        if (res.updateSearch) {
          getChartTopicRun({data: {title: res.search[0].type, modelId: device.modelId}});
          setType(res.search[0].type);
        } else {
          setType(device.type);
        }
        setSearch(res.search[0].type);
      }
      if (searchs.length === 0) {
        setSearchs(res.search || []);
      }
      if (updateSearch === undefined) {
        setUpdateSearch(res.updateSearch);
      }
      setChartData(res);
    }
  });

  const {loading, data = {}, run} = useRequest({
    ...deviceChartData,
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

  useEffect(() => {
    if (date.length > 0 && type) {
      run({data: {startTime: date[0], endTime: date[1], deviceId: device.deviceId, title: type}});
    }
  }, [date, type]);

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

  const listSubmit = (value) => {
    switch (chartData.key) {
      case 'signalLampId':
        ref.current.formActions.setFieldValue('passage', value);
        break;
      case 'mId':
        ref.current.formActions.setFieldValue('value', value);
        break;
      default:
        break;
    }
    ref.current.submit();
  };

  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
    >
      {isArray(chartData.messages).map((item, index) => {
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
      })}
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
      activeKey={search}
      onTabClick={(key) => {
        if (updateSearch) {
          getChartTopicRun({data: {title: key, modelId: device.modelId}});
          setType(key);
          setChartData();
        } else {
          listSubmit(key);
        }
        setSearch(key);
      }}
      items={searchs.map((item) => {
        return {
          key: item.type,
          label: item.columns,
        };
      })}
    />
    <Table
      SearchButton={<></>}
      searchForm={() => {
        if (updateSearch) {
          return <></>;
        }
        switch (chartData.key) {
          case 'signalLampId':
            return <div style={{display: 'none'}}>
              <FormItem name="passage" initialValue={search} component={Input}/>
            </div>;
          case 'mId':
            return <div style={{display: 'none'}}>
              <FormItem name="value" initialValue={search} component={Input}/>
            </div>;
          default:
            break;
        }
      }}
      loading={editLoading || batchHandleLoading}
      isModal
      ref={ref}
      onResponse={(res) => {
        // if (!ref.current.formActions.getFieldValue('passage')) {
        //   setPassage(res.search[0]);
        //   listSubmit(res.search[0]);
        // }
        // setSearchs(res.search || []);
      }}
      formSubmit={(values) => {
        return {
          ...listParams,
          ...values,
          // mId:'1581502767016009730',
          title: type,
          types: isArray(chartData.columns).filter(item => item.type).map(item => item.type)
        };
      }}
      formActions={formActionsPublic}
      api={listApi}
      noSort
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey={chartData.key}
      columnsResh
      columns={isArray(chartData.columns).map(item => {
        return {
          title: item.columns,
          align: 'center',
          dataIndex: item.key,
          render: (value, record) => {
            let error = false;
            switch (chartData.key) {
              case 'signalLampId':
                error = (record.alarmStatus || '').split(',').find(status => status === item.key);
                break;
              case 'mId':
                break;
              default:
                break;
            }
            if (typeof value === 'object') {
              return <></>;
            }
            return <Render
              className={error ? 'red' : 'green'}>{typeof value === 'number' ? value : (value || '-')}</Render>;
          }
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
