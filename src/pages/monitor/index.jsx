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
import useUrlState from '@ahooksjs/use-url-state';
import {getSearchParams} from 'ice';
import LeftTree from '@/pages/monitor/LeftTree';
import NoteSave from '@/pages/monitor/NoteSave';
import Info from '@/pages/monitor/Info';
import Render from '@/components/Render';
import FormItem from '@/components/Table/components/FormItem';
import styles from './index.module.less';
import {monitorList} from '@/pages/monitor/url';
import {LinkButton} from '@/components/Button';
import Table from '@/components/Table';
import {isObject} from '@/util/Tools';
import SelectBatch from '@/pages/equipment/Batch/components/SelectBatch';
import DateSelect from '@/pages/monitor/components/DateSelect';
import DeviceChar from '@/pages/monitor/DeviceChar';
import store from '@/store';
import ThousandsSeparator from '@/components/ThousandsSeparator';

const Monitor = () => {

  const [state] = useUrlState(
    {
      navigateMode: 'push',
    },
  );

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

  const searchParams = getSearchParams();

  const defaultTableQuery = state.params && JSON.parse(state.params) || {};

  const defaultModelId = defaultTableQuery?.values?.modelId || searchParams.modelId;

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
          <QuestionCircleOutlined />
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
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>,
      dataIndex: 'name',
      align: 'center',
      render: (name) => <Render text={name || '-'} />
    },
    // {
    //   title: 'MAC',
    //   dataIndex: 'mac',
    //   align: 'center',
    //   render: (mac) => <Render text={mac} />
    // },
    ...modelColumns.map(item => {
      const children = item.children || [];

      const render = (text, record, columnItem) => {
        if (typeof text !== 'number' && typeof text !== 'string') {
          return <Render width={70} onClick={() => {
            console.log(item.dataIndex);
            setOpen({protocolType: item.dataIndex, ...record});
          }}>-</Render>;
        }
        const percisionText = `${text}`.split('.')[1] || '';
        const value = (typeof text === 'number' || !!Number(text)) ?
          <ThousandsSeparator precision={percisionText.length} value={text} />
          :
          (text || '-');

        const color = '#018a51';

        return <Render
          width={70}
          style={{
            cursor: 'pointer',
            color: columnItem.color || isObject(record.filedStyle)[columnItem.dataIndex] || color
          }}
          onClick={() => {
            console.log(item.dataIndex);
            setOpen({protocolType: item.dataIndex, ...record});
          }}
        >
          {value}
          {value !== '-' && columnItem.unit}
        </Render>;
      };

      return {
        ...item,
        children: children.map(childrenItem => ({
          ...childrenItem,
          render: (text, record) => render(text, record, childrenItem)
        })),
        render
      };
    }),
    {
      title: 'GPS定位',
      dataIndex: '10',
      align: 'center',
      render: (text, record) => <Render className="green" width={100}>
        {(record.longitude && record.latitude) ? <div>手动：{record.longitude},{record.latitude}</div> : '-'}
      </Render>
    },
    {
      title: '设备IP地址', dataIndex: 'ip', align: 'center', render: (text, record) => <Render width={250}>
        <div hidden={text || record.devip}>-</div>
        <div hidden={!record.devip}>内网：{record.devip}</div>
        <div hidden={!text}>外网：{text}</div>
      </Render>
    },
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
      <FormItem label="终端备注" name="remarks" component={Input} />
      <FormItem label="设备名称" name="name" component={Input} />
      <FormItem label="批次" name="batchId" component={SelectBatch} />
      <div style={{display: 'none'}}>
        <FormItem name="deviceId" value={searchParams.deviceId} component={Input} />
      </div>
      <div style={{display: 'none'}}>
        <FormItem name="modelId" value={searchParams.modelId} component={Input} />
      </div>
      <div style={{display: 'none'}}><FormItem name="classifyId" component={Input} /></div>
      <div style={{display: 'none'}}><FormItem name="deptId" component={Input} /></div>
    </>;
  };


  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            noEmpty
            firstKey={!defaultModelId}
            open={close}
            showModules={customer.deptId ? ['terminal', 'group'] : ['terminal', 'customer']}
            modelId={defaultModelId}
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
                case 'customer':
                  ref.current.formActions.setFieldValue('deptId', key);
                  setParams({...params, deptId: key});
                  break;
                default:
                  break;
              }
              ref.current.submit();
            }}
          />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          noTableColumn
          isModal={false}
          interval
          formSubmit={(values) => {
            setParams({...params, ...values});
            return values;
          }}
          noRowSelection
          onReset={() => {
            ref.current.formActions.setFieldValue('modelId', params.modelId);
            ref.current.formActions.setFieldValue('classifyId', params.classifyId);
            ref.current.formActions.setFieldValue('deptId', params.deptId);
            ref.current.submit();
          }}
          maxHeight="calc(100vh - 435px)"
          condition={(values) => {
            return values.modelId;
          }}
          format={(data = []) => {
            return data.map(item => ({...(isObject(item.protocolDetail) || {}), ...item}));
          }}
          onResponse={(res = {}) => {
            setTimeout(() => {
              ref.current?.timedRefresh();
            }, 10000);
            if (res.count === 0) {
              setModelColumns([]);
              return;
            }
            setModelColumns(res.columns || []);
          }}
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
      <Info
        ref={infoRef}
        deviceId={infoVisible.deviceId}
        modelId={infoVisible.modelId}
        open={(title, defaultType) => {
          setOpen({protocolType: title, defaultType, ...infoVisible});
          setInfoVisible({});
        }}
      />
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
      open={open.protocolType}
      onClose={() => setOpen({})}
      extra={<DateSelect
        value={date}
        onChange={setDate}
      />}
    >
      <DeviceChar device={open} date={date} defaultType={open?.defaultType} />
    </Drawer>

  </>;
};
export default Monitor;
