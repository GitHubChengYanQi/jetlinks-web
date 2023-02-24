import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Drawer, Empty, Image, Input, message, Modal, Space, Tabs} from 'antd';
import PageSkeleton from '@ant-design/pro-skeleton';
import {createFormActions} from '@formily/antd';
import pako from 'pako';
import {config, useHistory} from 'ice';
import cookie from 'js-cookie';
import moment from 'moment';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {LinkButton, PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import MyModal from '@/components/Modal';
import Render from '@/components/Render';
import {useRequest} from '@/util/Request';
import Save from '@/pages/monitor/Info/Save';
import Warning from '@/components/Warning';
import {isArray} from '@/util/Tools';
import FormItem from '@/components/Table/components/FormItem';
import Control from '@/pages/monitor/Control';
import DatePicker from '@/components/DatePicker';
import Chart from '@/pages/monitor/DeviceChar/components/Chart';
import ThousandsSeparator from '@/components/ThousandsSeparator';
import {alarmRecordList} from '@/pages/alarm/url';
import Record from '@/pages/alarm/Record';
import AlarmDetail from '@/pages/monitor/DeviceChar/components/AlarmDetail';

export const deviceChartData = {url: '/device/chartData', method: 'POST'};
export const getChartTopic = {url: '/deviceModel/getChartTopic', method: 'POST'};
export const alarmRecordView = {url: '/alarmRecord/handelAlarm', method: 'POST'};
export const getTab = {url: '/deviceHistory/getTab', method: 'POST'};

const formActionsPublic = createFormActions();

const DeviceChar = ({device = {}, defaultType, date = []}) => {

  const ref = useRef();
  const recordRef = useRef();

  const startTime = date[0];
  const endTime = date[1];

  const [type, setType] = useState();

  const [saveVisible, setSaveVisible] = useState();

  const [alarmVisible, setAlarmVisible] = useState();

  const [control, setControl] = useState(false);

  const [search, setSearch] = useState();

  const [chartData, setChartData] = useState();

  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const [list, setList] = useState([]);

  const [searchs, setSearchs] = useState([]);
  const [updateSearch, setUpdateSearch] = useState();

  const [exportVisible, setExportVisble] = useState();
  const [exportTime, setExportTime] = useState([]);

  const controlRef = useRef();

  const getApi = (key) => {
    const api = isArray(chartData?.buttonApiUrls).find(item => item.key === key);
    return {
      url: api?.path,
      method: api?.method,
    };
  };

  const {loading: getChartLoading, run: getChartTopicRun} = useRequest({
    ...getChartTopic,
    data: {title: device.protocolType, modelId: device.modelId}
  }, {
    onSuccess: (res = {}) => {
      if (res.search && !search) {
        const searchType = isArray(res.search)[0] && isArray(res.search)[0].type;
        if (res.updateSearch) {
          getChartTopicRun({data: {title: defaultType || searchType, modelId: device.modelId}});
          setType(defaultType || searchType);
        } else {
          setType(device.protocolType);
        }
        setSearch(defaultType || searchType);
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

  const {loading: batchHandleLoading, run: batchHandle} = useRequest(alarmRecordView, {
    manual: true,
    fetchKey: (request) => {
      return request?.key;
    }
  });

  const {data: alarmRecordData = [], run: alarmRecordRun} = useRequest(alarmRecordList, {
    manual: true,
  });


  const {data: tab, run: getCurrentTab} = useRequest(getTab, {
    manual: true,
    onSuccess: (res) => {
      alarmRecordRun({
        data: {
          deviceId: device.deviceId,
          channel: res,
          status: 0
        }
      });
    }
  });

  useEffect(() => {
    if (type) {
      getCurrentTab({
        data: {
          title: type,
          deviceId: device.deviceId
        }
      });
    }
  }, [type]);

  useEffect(() => {
    if (startTime && endTime) {
      setExportTime(date);
      // 列表时间
      if (!ref.current) {
        return;
      }
      ref.current.formActions.setFieldValue('startTime', startTime);
      ref.current.formActions.setFieldValue('endTime', endTime);
      ref.current.submit();
    }
  }, [startTime, endTime]);

  if (getChartLoading) {
    return <PageSkeleton type="descriptions"/>;
  }

  if (!chartData) {
    return <Empty/>;
  }

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

  const alarm = alarmRecordData.length > 0;

  return <>
    <Chart
      type={type}
      chartData={chartData}
      api={getApi('sjtb')}
      device={device}
      startTime={startTime}
      endTime={endTime}
    />

    <Tabs
      tabBarExtraContent={<Space>
        {isArray(chartData.button).map((item, index) => {
          return <LinkButton key={index} onClick={() => {
            switch (item.type) {
              case 'warningConfig':
                setAlarmVisible(true);
                // setSaveVisible(true);
                break;
              case 'remoteControl':
                if (isArray(item?.downDatas).length === 1) {
                  Modal.confirm({
                    zIndex: 1005,
                    title: '提示信息',
                    centered: true,
                    icon: <ExclamationCircleOutlined/>,
                    content: `确定控制${item.title}？`,
                    onOk: () => {
                      controlRef.current.submit(isArray(item?.downDatas)[0].key);
                    },
                  });
                  return;
                }
                setControl(item);
                break;
              case 'batchHandel':
                Modal.confirm({
                  zIndex: 1005,
                  title: '提示信息',
                  centered: true,
                  icon: <ExclamationCircleOutlined/>,
                  content: '确定一键处理吗？',
                  onOk: async () => {
                    await batchHandle({
                      key: item.key,
                      data: {
                        key: type,
                        deviceId: device.deviceId
                      }
                    });
                    message.success('处理成功！');
                    ref.current.refresh();
                  },
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
      noTableColumn
      fixDataSource={alarm && list.length === 0 ? [{}] : false}
      format={(data) => {
        const newData = data.map((item, index) => ({...item, key: index}));
        setList(newData);
        return newData;
      }}
      bordered={false}
      SearchButton={<></>}
      searchForm={() => {
        let otherForm = <></>;
        if (!updateSearch) {
          switch (chartData.key) {
            case 'signalLampId':
              otherForm = <>
                <FormItem name="passage" initialValue={search} component={Input}/>
              </>;
              break;
            case 'trafficLightId':
              otherForm = <>
                <FormItem name="passageRemarks" initialValue={search} component={Input}/>
                <FormItem name="passage" initialValue={search} component={Input}/>
              </>;
              break;
            case 'mId':
              otherForm = <>
                <FormItem name="value" initialValue={search} component={Input}/>
              </>;
              break;
            default:
              break;
          }
        }
        return <div style={{display: 'none'}}>
          <FormItem name="deviceId" initialValue={device.deviceId} component={Input}/>
          <FormItem name="startTime" initialValue={startTime} component={Input}/>
          <FormItem name="endTime" initialValue={endTime} component={Input}/>
          <FormItem name="title" initialValue={type} component={Input}/>
          <FormItem
            name="types"
            initialValue={isArray(chartData.columns).filter(item => item.type).map(item => item.type)}
            component={Input}
          />
          {otherForm}
        </div>;
      }}
      loading={batchHandleLoading}
      isModal
      ref={ref}
      formActions={formActionsPublic}
      api={getApi('sjlb')}
      noSort
      actionConfig={{
        onCell: (_, index) => ({
          colSpan: (alarm && index === 0) ? 0 : 1,
        })
      }}
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey="key"
      columnsResh
      columns={isArray(chartData.columns).map((item, columnsIndex) => {
        const colSpan = columnsIndex === 0 ? chartData.columns.length + 1 : 0;
        return {
          title: item.columns,
          align: 'center',
          onCell: (_, index) => ({
            colSpan: (alarm && index === 0) ? colSpan : 1,
          }),
          dataIndex: item.key,
          render: (value, record, index) => {
            if ((alarm && index === 0)) {
              return <Alert
                message={<>上报数据存在报警信息，<a onClick={() => {
                  recordRef.current.open(true);
                  // history.push(`/alarm/record?mac=${device.mac}&channel=${channel}`);
                }}>点击查看报警记录</a></>}
                type="error"
              />;
            }
            // return getImgBase64('')
            if (typeof value === 'object') {
              return <></>;
            } else if (item.filedType === 'image') {
              return getImgBase64(value);
            } else {
              const percisionText = `${value}`.split('.')[1] || '';
              const val = typeof value === 'number' || !!Number(value) ?
                <ThousandsSeparator precision={percisionText.length} value={value}/>
                :
                (value || '-');

              let color = '';
              let label = '';
              let fontSize = 14;
              const valueFormat = isArray(item.formats).find(item => item.value === value);
              if (valueFormat) {
                color = valueFormat.color;
                label = valueFormat.label;
                fontSize = valueFormat.fontSize || 14;
              }

              return <Render
                style={{color: color || (record.num > 0 ? item.color : '#018a51'), fontSize}}
              >
                {label || val}{((label || val) !== '-') && item.unit}
              </Render>;
            }
          }
        };
      })}
      actionRender={(value, record) => {
        return <Warning
          disabled={!alarm}
          content="确定处理吗？"
          onOk={() => batchHandle({
            data: {
              deviceRecordId: record.deviceRecordId,
              key: type,
              deviceId: device.deviceId
            }
          }).then(() => {
            message.success('处理成功！');
            ref.current.refresh();
          })}>
          <PrimaryButton disabled={!(record.num > 0)}>处理</PrimaryButton>
        </Warning>;
      }}
    />

    <Save
      device={device}
      visible={saveVisible}
      close={() => setSaveVisible(false)}
      success={() => {
        setSaveVisible();
      }}
    />

    <Drawer
      destroyOnClose
      width="auto"
      title="查看本设备报警规则"
      open={alarmVisible}
      onClose={() => setAlarmVisible(false)}
    >
      <AlarmDetail device={device}/>
    </Drawer>

    <Control
      ref={controlRef}
      visible={control}
      MAC={device.mac}
      data={isArray(control?.downDatas)}
      search={isArray(control?.search)}
      onClose={() => setControl(false)}
    />

    <Modal width="auto" centered open={visible} footer={null} onCancel={() => setVisible(false)}>
      <div style={{padding: 24, textAlign: 'center'}}>
        <Image width={500} src={visible}/>
      </div>
    </Modal>

    <Modal
      onCancel={() => setExportVisble(false)}
      title="数据导出"
      okText="导出"
      okButtonProps={{disabled: exportTime.length === 0}}
      onOk={() => {
        const url = '/monitor/excelExport';
        if (!url) {
          return;
        }
        const {baseURI} = config;
        const token = cookie.get('jetlink-token');
        window.open(`${baseURI}${url}?authorization=${token}&limit=5000&page=1&startTime=${exportTime[0]}&endTime=${moment(exportTime[1]).format('YYYY/MM/DD 23:59:59')}&title=${type}&deviceId=${device.deviceId}`);
      }}
      open={exportVisible}
    >
      <div style={{textAlign: 'center'}}>
        选择导出时间段：
        <DatePicker
          RangePicker
          value={exportTime}
          picker="day"
          onChange={setExportTime}
          disabledDate={(currentDate) => {
            return currentDate && currentDate >= moment().subtract(1, 'days');
          }}/>
      </div>
    </Modal>

    <MyModal width="auto" headTitle="报警记录" ref={recordRef}>
      <Record channel={tab} deviceId={device.deviceId} show/>
    </MyModal>

  </>;
};

export default DeviceChar;
