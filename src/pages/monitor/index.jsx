import React, {useRef, useState} from 'react';
import {
  Row,
  Col,
  Button,
  Space,
  Tooltip,
  Input,
  Drawer,
  Select as AntSelect,
} from 'antd';
import {EditOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {getSearchParams} from 'ice';
import moment from 'moment';
import LeftTree from '@/pages/monitor/LeftTree';
import NoteSave from '@/pages/monitor/NoteSave';
import Info from '@/pages/monitor/Info';
import Render from '@/components/Render';
import FormItem from '@/components/Table/components/FormItem';
import styles from './index.module.less';
import GridPowerSupply from '@/pages/monitor/components/GridPowerSupply';
import BackboneNetwork from '@/pages/monitor/components/BackboneNetwork';
import Network4G from '@/pages/monitor/components/4gNetwork';
import DatePicker from '@/components/DatePicker';
import {monitorList} from '@/pages/monitor/url';
import {LinkButton} from '@/components/Button';
import Table from '@/components/Table';
import Lamp from '@/pages/monitor/components/Lamp';
import SolarCellCapacity from '@/pages/monitor/components/SolarCellCapacity';
import Combo from '@/pages/monitor/components/Combo';
import AncillaryMonitoring from '@/pages/monitor/components/AncillaryMonitoring';
import ChannelControl from '@/pages/monitor/components/ChannelControl';
import UplinkDevice from '@/pages/monitor/components/UplinkDevice';
import AccessNetworkPort from '@/pages/monitor/components/AccessNetworkPort';
import WorkingVoltage from '@/pages/monitor/components/WorkingVoltage';
import WiredNetwork from '@/pages/monitor/components/WiredNetwork';
import AI from '@/pages/monitor/components/AI';
import DI from '@/pages/monitor/components/DI';
import DO from '@/pages/monitor/components/DO';
import RS232 from '@/pages/monitor/components/RS232';
import {isObject} from '@/util/Tools';

const Monitor = () => {

  const searchParams = getSearchParams();

  const [infoVisible, setInfoVisible] = useState({});
  const [noteVisible, setNoteVisible] = useState({});

  const [date, setDate] = useState([]);

  const [params, setParams] = useState({});

  const [open, setOpen] = useState({});

  const ref = useRef();
  const infoRef = useRef();

  const [modelColumns, setModelColumns] = useState([]);

  const columns = [
    {
      title: '设备状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render: (status) => {
        const online = status === 'online';
        return <Render>
          <span className={online ? 'green' : 'close'}>{online ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: <Space>
        终端备注
        <Tooltip placement="top" title="终端设备备注的名称，平台可以修改">
          <QuestionCircleOutlined/>
        </Tooltip>
      </Space>,
      dataIndex: 'remarks',
      align: 'center',
      render: (remarks, record) => {
        return <div style={{display: 'flex', alignItems: 'center'}}>
          <Render style={{flexGrow: 1}}>
            <Button
              className="blue"
              type="link"
              onClick={() => setInfoVisible(record)}>{remarks || '-'}</Button>
          </Render>
          <EditOutlined
            style={{float: 'right'}}
            onClick={() => setNoteVisible({deviceId: record.deviceId, remarks})}
          />
        </div>;
      }
    },
    {
      title: <Space>
        登记名称
        <Tooltip placement="top" title="设备上报的登记名称，平台不可以修改">
          <QuestionCircleOutlined/>
        </Tooltip>
      </Space>,
      dataIndex: 'name',
      align: 'center',
      render: (name) => <Render text={name || '-'}/>
    }, {
      title: 'MAC',
      dataIndex: 'mac',
      align: 'center',
      render: (mac) => <Render text={mac}/>
    },
    ...modelColumns.map(item => {
      const children = item.children || [];
      const render = (text, record) => {
        if (typeof text === 'object') {
          return <Render>-</Render>;
        }
        try {
          return <Render style={{cursor: 'pointer'}} onClick={() => {
            console.log(item.dataIndex);
            setDate([
              moment(new Date()).format('YYYY/MM/DD'),
              moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
            ]);
            setOpen({type: item.dataIndex, ...record});
          }}>{typeof text === 'number' ? text : (text || '-')}</Render>;
        } catch (e) {
          return <Render text="-"/>;
        }
      };
      return {...item, children: children.map(childrenItem => ({...childrenItem, render})), render};
    }),
    {
      title: 'GPS定位',
      dataIndex: '10',
      align: 'center',
      render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
    },
    {title: '设备IP地址', dataIndex: 'ip', align: 'center', render: (text) => <Render text={text || '-'}/>},
  ];

  const [close, setClose] = useState(false);

  const searchForm = () => {
    return <>
      <FormItem
        label="设备状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '在线', value: 'online'}, {label: '离线', value: 'offline'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
      <FormItem label="终端备注" name="remarks" component={Input}/>
      <FormItem label="设备名称" name="name" component={Input}/>
      <div style={{display: 'none'}}>
        <FormItem name="deviceId" value={searchParams.deviceId} component={Input}/>
      </div>
      <div style={{display: 'none'}}>
        <FormItem name="modelId" value={searchParams.modelId} component={Input}/>
      </div>
      <div style={{display: 'none'}}><FormItem name="classifyId" component={Input}/></div>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            noEmpty
            firstKey={!searchParams.modelId}
            open={close}
            modelId={searchParams.modelId}
            classifyId={searchParams.classifyId}
            close={() => setClose(!close)}
            onChange={(key, type) => {
              switch (type) {
                case 'terminal':
                  ref.current.formActions.setFieldValue('modelId', key);
                  setParams({...params, modelId: key});
                  break;
                case 'group':
                  ref.current.formActions.setFieldValue('classifyId', key);
                  setParams({...params, classifyId: key});
                  break;
                default:
                  break;
              }
              ref.current.submit();
            }}/>
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          noRowSelection
          onReset={() => {
            ref.current.formActions.setFieldValue('modelId', params.modelId);
            ref.current.formActions.setFieldValue('classifyId', params.classifyId);
            ref.current.submit();
          }}
          maxHeight="calc(100vh - 435px)"
          condition={(values) => {
            return values.modelId;
          }}
          format={(data = []) => {
            return data.map(item => ({...item, ...(isObject(item.protocolDetail) || {})}));
          }}
          onResponse={(res = {}) => {
            if (res.count === 0) {
              setModelColumns([]);
              return;
            }
            setModelColumns(res.columns || []);
          }}
          columnsResh
          ref={ref}
          searchForm={searchForm}
          api={monitorList}
          columns={columns}
          rowKey="deviceId"
          actionRender={() => (
            <Button type="primary">孪生数据</Button>
          )}
        />
      </Col>
    </Row>

    <Drawer
      destroyOnClose
      title={`终端备注：${infoVisible.remarks}    设备型号：${infoVisible.modelName}`}
      width="auto"
      placement="right"
      onClose={() => setInfoVisible({})}
      open={infoVisible.modelId}
      extra={<LinkButton onClick={() => infoRef.current.openAlarm()}>报警设置</LinkButton>}
    >
      <Info ref={infoRef} deviceId={infoVisible.deviceId} modelId={infoVisible.modelId}/>
    </Drawer>

    <NoteSave
      close={() => setNoteVisible({})}
      data={noteVisible}
      success={() => {
        setNoteVisible({});
        ref.current.refresh();
      }}
    />

    <Drawer
      title={`终端备注：${open.remarks || '-'}    设备型号：${open.modelName}`}
      destroyOnClose
      style={{minWidth: '50vw'}}
      className={styles.drawer}
      open={open.type}
      onClose={() => setOpen({})}
      extra={<DatePicker
        width={400}
        RangePicker
        value={date}
        showTime
        onChange={setDate}
        disabledDate={(currentDate) => {
          return currentDate && (currentDate < moment().subtract(7, 'days') || currentDate > moment().subtract(0, 'days'));
        }}/>}
    >
      {open.type === 'tyngdjc' && <GridPowerSupply/>}
      {open.type === 'tyndcrl' && <SolarCellCapacity/>}
      {open.type === 'zgwljc' && <BackboneNetwork/>}
      {/* {open.type === 'combo' && <Combo/>} */}
      {['rtuid', 'network', 'RSSI', 'local1', 'local2', 'ETH', '4G', 'datastreams'].includes(open.type) &&
        <Network4G device={open}/>}
      {/* {open.type === 'fsjc' && <AncillaryMonitoring device={open}/>} */}
      {open.type === 'ttkz' && <ChannelControl device={open}/>}
      {['dwgdjc', 'sxsbjc'].includes(open.type) && <UplinkDevice device={open}/>}
      {open.type === 'jrwk' && <AccessNetworkPort device={open}/>}
      {open.type === 'dyjbs' && <WorkingVoltage device={open}/>}
      {open.type === 'dlbjs' && <WiredNetwork device={open}/>}
      {open.type === 'shbjs' && <AI device={open}/>}
      {open.type === 'bi' && <DI device={open}/>}
      {open.type === 'doo' && <DO device={open}/>}
      {['rS232', 'rs485'].includes(open.type) && <RS232 device={open}/>}
      <Lamp device={open} date={date}/>
    </Drawer>

  </>;
};
export default Monitor;
