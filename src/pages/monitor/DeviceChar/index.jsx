import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Image, Input, message, Modal, Space, Tabs} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import {createFormActions} from '@formily/antd';
import pako from 'pako';
import {config} from 'ice';
import cookie from 'js-cookie';
import moment from 'moment';
import {ExclamationCircleOutlined} from '@ant-design/icons';
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
import Control from '@/pages/monitor/Control';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import DatePicker from '@/components/DatePicker';

export const deviceChartData = {url: '/device/chartData', method: 'POST'};
export const getChartTopic = {url: '/deviceModel/getChartTopic', method: 'POST'};
export const alarmRecordView = {url: '/alarmRecord/handelAlarm', method: 'POST'};

const formActionsPublic = createFormActions();

const DeviceChar = ({device = {}, defaultType, date = []}) => {

  const ref = useRef();

  const [type, setType] = useState();

  const [saveVisible, setSaveVisible] = useState();

  const [control, setControl] = useState(false);

  const [search, setSearch] = useState();

  const [chartData, setChartData] = useState();

  const [visible, setVisible] = useState(false);

  const [searchs, setSearchs] = useState([]);
  const [updateSearch, setUpdateSearch] = useState();

  const [exportVisible, setExportVisble] = useState();
  const [exportTime, setExportTime] = useState([]);


  const getApi = (key) => {
    const api = isArray(chartData?.buttonApiUrls).find(item => item.key === key);
    return {
      url: api?.path,
      method: api?.method,
    };
  };

  const listParams = {deviceId: device.deviceId, startTime: date[0], endTime: date[1]};

  const {loading: getChartLoading, run: getChartTopicRun} = useRequest({
    ...getChartTopic,
    data: {title: device.protocolType, modelId: device.modelId}
  }, {
    onSuccess: (res) => {
      if (res.search && !search) {
        if (res.updateSearch) {
          getChartTopicRun({data: {title: defaultType || res.search[0].type, modelId: device.modelId}});
          setType(defaultType || res.search[0].type);
        } else {
          setType(device.protocolType);
        }
        setSearch(defaultType || res.search[0].type);
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

  const {loading, data = {}, run} = useRequest(getApi('sjtb'), {manual: true});

  const {loading: batchHandleLoading, run: batchHandle} = useRequest(alarmRecordView, {
    manual: true,
    onSuccess: () => {
      message.success('处理成功！');
      ref.current.refresh();
    }
  });

  const {data: deviceDetail, refresh} = useRequest({
    ...monitorDetail,
    data: {deviceId: device.deviceId, modelId: device.modelId}
  });

  useEffect(() => {
    if (date.length > 0 && type && chartData) {
      const diffHours = moment(date[1]).diff(moment(date[0]), 'hours');
      let frame = 1;
      if (diffHours > 24) {
        frame = 24;
      } else if (diffHours > 96) {
        frame = 96;
      } else if (diffHours > 168) {
        frame = 168;
      }
      run({
        data: {
          startTime: date[0],
          endTime: date[1],
          deviceId: device.deviceId,
          title: type,
          frame
        }
      });
    }
  }, [date, type, chartData]);

  if (getChartLoading) {
    return <PageSkeleton type="descriptions" />;
  }

  if (!chartData) {
    return <></>;
  }


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
    return newArray.map(item => ({
      title: item.title || '',
      value: item.value || 0,
      time: item.time || '',
    }));
  };

  const listSubmit = (value) => {
    switch (chartData.key) {
      case 'signalLampId':
        ref.current.formActions.setFieldValue('passage', value);
        break;
      case 'trafficLightId':
        ref.current.formActions.setFieldValue('passageRemarks', value);
        break;
      case 'mId':
        ref.current.formActions.setFieldValue('value', value);
        break;
      default:
        ref.current.formActions.setFieldValue('value', value);
        break;
    }
    ref.current.submit();
  };

  const getImgBase64 = (base64) => {
    if (!base64) {
      return '-';
    }
    const strData = atob(base64);

    const charData = strData.split('').map(function (x) {
      return x.charCodeAt(0);
    });

    const binData = new Uint8Array(charData);
    const imgBase64 = pako.inflate(binData, {to: 'string'});
    return <Button
      style={{padding: 0}}
      type="link"
      onClick={() => setVisible(`data:image/jpeg;base64,${imgBase64}`)}
    >查看</Button>;
  };

  return <>
    <Card
      bodyStyle={{padding: 0}}
      bordered={false}
    >
      {loading ? <PageSkeleton /> : isArray(chartData.messages).map((item, index) => {
        const lines = item.lines || [];
        const lineSort = isArray(item.sort);
        switch (item.lineType) {
          case 'straightLine':
            return <div key={index}>
              {item.title}
              <StepLineChart
                data={isArray(data[item.key]).map(item => {
                  const sortItem = lineSort.find(sItem => `${sItem.value}` === `${item.value}`);
                  return {
                    title: item.title || '',
                    value: sortItem?.title || 1,
                    time: item.time || '',
                  };
                })}
                id={item.key}
                sort={lineSort.length > 0 && lineSort.map(item => item.title)}
              />
            </div>;
          default:
            return <div key={index}>
              {item.title}
              <BrokenLine
                data={sort(data[item.key] || [], lines)}
                colors={lines.map(item => item.color)}
                id={item.key}
              />
            </div>;
        }
      })}
    </Card>

    <Tabs
      tabBarExtraContent={<Space>
        {isArray(chartData.button).map((item, index) => {
          return <LinkButton key={index} onClick={() => {
            switch (item.type) {
              case 'warningConfig':
                setSaveVisible(deviceDetail);
                break;
              case 'remoteControl':
                setControl(item);
                break;
              case 'batchHandel':
                Modal.confirm({
                  zIndex: 1005,
                  title: '提示信息',
                  centered: true,
                  icon: <ExclamationCircleOutlined />,
                  content: '确定一键处理吗？',
                  onOk: () => batchHandle({data: {key: type, deviceId: device.deviceId}}),
                });
                break;
              case 'excelExport':
                setExportVisble(true);
                break;
              default:
                break;
            }
          }}>{item?.title}</LinkButton>;
        })}
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
      bordered={false}
      SearchButton={<></>}
      searchForm={() => {
        if (updateSearch) {
          return <></>;
        }
        switch (chartData.key) {
          case 'signalLampId':
            return <div style={{display: 'none'}}>
              <FormItem name="passage" initialValue={search} component={Input} />
            </div>;
          case 'trafficLightId':
            return <div style={{display: 'none'}}>
              <FormItem name="passageRemarks" initialValue={search} component={Input} />
              <FormItem name="passage" initialValue={search} component={Input} />
            </div>;
          case 'mId':
            return <div style={{display: 'none'}}>
              <FormItem name="value" initialValue={search} component={Input} />
            </div>;
          default:
            break;
        }
      }}
      loading={batchHandleLoading}
      isModal
      ref={ref}
      formSubmit={(values) => {
        return {
          ...listParams,
          ...values,
          title: type,
          types: isArray(chartData.columns).filter(item => item.type).map(item => item.type)
        };
      }}
      formActions={formActionsPublic}
      api={getApi('sjlb')}
      noSort
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey="id"
      columnsResh
      columns={isArray(chartData.columns).map(item => {
        return {
          title: item.columns,
          align: 'center',
          dataIndex: item.key,
          render: (value, record) => {
            if (typeof value === 'object') {
              return <></>;
            } else if (item.filedType === 'image') {
              return getImgBase64(value);
            } else {
              const val = typeof value === 'number' ? value : (value || '-');
              return <Render
                style={{color: record.num > 0 ? item.color : '#009688'}}
              >
                {val}{val !== '-' && item.unit}
              </Render>;
            }
          }
        };
      })}
      actionRender={(value, record) => {
        const alarm = record.num > 0;
        return <Warning
          disabled={!alarm}
          content="确定处理吗？"
          onOk={() => batchHandle({
            data: {
              deviceRecordId: record.deviceRecordId,
              key: type,
              deviceId: device.deviceId
            }
          })}>
          <PrimaryButton disabled={!alarm}>处理</PrimaryButton>
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

    <Control
      visible={control}
      MAC={device.mac}
      data={isArray(control?.downDatas)}
      search={isArray(control?.search)}
      onClose={() => setControl(false)}
    />

    <Modal width="auto" centered open={visible} footer={null} onCancel={() => setVisible(false)}>
      <div style={{padding: 24, textAlign: 'center'}}>
        <Image width={500} src={visible} />
      </div>
    </Modal>

    <Modal
      onCancel={() => setExportVisble(false)}
      title="数据导出"
      okText="导出"
      okButtonProps={{disabled: exportTime.length === 0}}
      onOk={() => {
        const url = getApi('dc').url;
        if (!url) {
          return;
        }
        const {baseURI} = config;
        const token = cookie.get('jetlink-token');
        window.open(`${baseURI}${url}?authorization=${token}&startTime=${exportTime[0]}&endTime=${moment(exportTime[1]).format('YYYY/MM/DD 23:59:59')}&title=${type}&deviceId=${device.deviceId}`);
      }}
      open={exportVisible}
    >
      <div style={{textAlign: 'center'}}>
        选择导出时间段 <DatePicker RangePicker value={exportTime} picker="day" onChange={setExportTime} />
      </div>
    </Modal>

  </>;
};

export default DeviceChar;
