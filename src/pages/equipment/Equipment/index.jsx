import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Select as AntSelect, message} from 'antd';
import {config} from 'ice';
import moment from 'moment';
import cookie from 'js-cookie';
import {EditOutlined} from '@ant-design/icons';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Restart from '@/pages/equipment/Equipment/Restart';
import Save from '@/pages/equipment/Equipment/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList, deviceStart} from '@/pages/equipment/Equipment/url';
import Cascader from '@/components/Cascader';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import DynamicForms from '@/pages/equipment/Equipment/DynamicForms';
import MoveGroup from '@/pages/equipment/Equipment/MoveGroup';
import NoteSave from '@/pages/monitor/NoteSave';
import store from '@/store';
import {PrimaryButton} from '@/components/Button';
import SelectModle from '@/pages/equipment/OutStock/Save/components/SelectModle';
import Modal from '@/components/Modal';
import Edition from '@/pages/equipment/Edition';
import SelectGroup from '@/pages/equipment/OutStock/Save/components/SelectGroup';
import SelectBatch from '@/pages/equipment/Batch/components/SelectBatch';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';

const formActionsPublic = createFormActions();

const Equipment = (
  {
    modelId,
    select,
    onChange = () => {
    }
  }
) => {

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const ref = useRef();
  const editionRef = useRef();

  const [noteVisible, setNoteVisible] = useState({});

  const [saveVisible, setSaveVisible] = useState();

  const [moveGrouVisible, setMoveGrouVisible] = useState();

  const [restarting, setRestarting] = useState();

  const [records, setRecords] = useState([]);

  const keys = records.map(item => item.deviceId);

  const [formVisible, setFormVisible] = useState();

  const {loading: startLoading, run: start} = useRequest(deviceStart, {
    manual: true,
    onSuccess: () => {
      setRecords([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
  });

  const columns = [
    {
      title: '设备状态',
      dataIndex: 'status',
      align: 'center',
      render: (value) => {
        const open = value === 'online';
        return <Render>
          <span className={open ? 'green' : 'close'}>{open ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: '终端备注',
      dataIndex: 'remarks',
      align: 'center',
      render: (remarks, record) => {
        return <div style={{display: 'flex', alignItems: 'center'}}>
          <Render style={{flexGrow: 1}}>{remarks || '-'}</Render>
          <EditOutlined
            style={{float: 'right', marginLeft: 8}}
            onClick={() => setNoteVisible({deviceId: record.deviceId, remarks})}
          />
        </div>;
      }
    },
    {
      title: '登记名称',
      dataIndex: 'name',
      align: 'center',
      render: (text) => <Render text={text || '-'} />
    },
    {
      title: customer.customerId ? '设备分组' : '所属客户',
      dataIndex: customer.customerId ? 'classifyName' : 'customerName',
      align: 'center',
      render: (text) => <Render text={text || '-'} />
    },
    {
      title: '设备类别',
      dataIndex: 'categoryName',
      align: 'center',
      render: (text) => <Render text={text} />
    },
    {
      title: '设备型号',
      dataIndex: 'modelName',
      align: 'center',
      render: (text) => <Render width={120} text={text} />
    },
    {
      title: '设备IP地址',
      dataIndex: 'ip',
      align: 'center',
      render: (text) => {
        return <Render width={120}>
          <Warning content="确定进入远程配置么？">
            <Button className="blue" type="link">{text}</Button>
          </Warning>
        </Render>;
      }
    },
    {
      title: '设备MAC地址',
      dataIndex: 'mac',
      align: 'center',
      render: (text) => <Render width={120} text={text} />
    }, {
      title: '批次',
      dataIndex: 'batchCoding',
      align: 'center',
      render: (text) => <Render width={120} text={text} />
    },
    {
      title: '设备版本',
      align: 'center',
      render: (value, record) => <Render>
        <Button type="link" onClick={() => editionRef.current.open({
          deviceId: record.deviceId,
          modelId: record.modelId,
          categoryId: record.categoryId
        })}>管理设备版本</Button>
      </Render>
    },
    {
      title: '位置信息',
      dataIndex: 'area',
      align: 'center',
      render: (text, record) => <Render width={200} text={text + record.address} />
    }, {
      title: '经纬度信息',
      dataIndex: '10',
      align: 'center',
      render: (text, record) => <Render width={200}>
        {record.longitude || '-'}，{record.latitude || '-'}
      </Render>
    },
    {
      title: '运行时间',
      dataIndex: 'logTime',
      align: 'center',
      render: (value, record) => {
        const open = record.status === 'online';
        if (!open) {
          return <Render width={150} text="-" />;
        }
        const oldsecond = moment(new Date()).diff(value, 'second');
        const day = Math.floor(oldsecond / 86400) || 0;
        const hours = Math.floor((oldsecond % 86400) / 3600) || 0;
        const minutes = Math.floor(((oldsecond % 86400) % 3600) / 60) || 0;
        const newsecond = Math.floor(((oldsecond % 86400) % 3600) % 60) || 0;
        return <Render width={150}>
          {day}天{hours}时{minutes}分{newsecond}秒
        </Render>;
      }
    },
    {
      title: '上线时间',
      dataIndex: 'logTime',
      align: 'center',
      render: (value, record) => {
        const open = record.status === 'online';
        return <Render width={150} text={open ? value : '-'} />;
      }
    },
    {
      title: '离线时间',
      dataIndex: 'logTime',
      align: 'center',
      render: (value, record) => {
        const open = record.status === 'online';
        return <Render width={150} text={!open ? value : '-'} />;
      }
    },
    {
      title: '质保时间',
      dataIndex: 'closingDate',
      align: 'center',
      render: (text) => <Render
        width={150}
        className={moment(text).diff(moment(new Date())) > 0 ? 'green' : 'red'}
        text={text ? moment(text).format('YYYY/MM/DD') : '-'}
      />
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="确定要重启设备么?" onOk={() => {
          start({data: {deviceIds: keys}});
        }}>批量重启</Warning>,
      },
    ]}
  />;


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
      <FormItem label="登记名称" name="name" component={Input} />
      <div style={{display: customer.customerId && 'none'}}>
        <FormItem label="所属客户" name="customerId" component={SelectCustomer} />
      </div>
      <div style={{display: !customer.customerId && 'none'}}>
        <FormItem label="设备分组" name="classifyId" component={SelectGroup} />
      </div>
      <div style={{display: modelId && 'none'}}>
        <FormItem label="设备型号" name="modelId" component={SelectModle} />
      </div>
      <FormItem label="设备MAC" name="mac" component={Input} />
      <FormItem label="批次" name="batchId" component={SelectBatch} />
      <FormItem label="位置信息" name="positionId" component={Cascader} options={dataSource.area} />
      <FormItem label="离线时间" name="time" component={DatePicker} RangePicker />
    </>;
  };


  return <>
    <Table
      formActions={formActionsPublic}
      formSubmit={(values) => {
        if (values.positionId) {
          values = {...values, positionIds: [values.positionId]};
        }
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return {modelId, ...values,};
      }}
      checkedRows={records}
      onChangeRows={(rows) => {
        onChange(rows);
        setRecords(rows);
      }}
      selectedRowKeys={keys}
      tableKey={select ? null : 'device'}
      loading={startLoading}
      ref={ref}
      searchButtons={select ? [] : [
        <Button disabled={keys.length === 0} type="primary" key={1} onClick={() => {
          setMoveGrouVisible(keys);
        }}>移动分组</Button>,
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <Button type="primary">批量操作</Button>
        </Dropdown>,
        <Button disabled={keys.length === 0} type="primary" key={3} onClick={() => {
          window.open(`${baseURI}/deviceExcel/export?authorization=${token}&deviceIds=${keys}`);
        }}>导出</Button>
      ]}
      searchForm={searchForm}
      api={deviceList}
      columns={columns}
      rowKey="deviceId"
      noAction={select}
      actionRender={(text, record) => {
        return <Space>
          <Button
            type="primary"
            onClick={() => setSaveVisible({...record, position: [record.longitude, record.latitude]})}
          >
            编辑
          </Button>
          <Warning content="确定要重启设备么?" onOk={() => {
            message.success('操作成功！');
          }}>
            <PrimaryButton>重启</PrimaryButton>
          </Warning>
        </Space>;
      }}
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={(success) => {
        setSaveVisible(null);
        if (success) {
          ref.current.submit();
        } else {
          ref.current.refresh();
        }
      }}
    />

    <MoveGroup
      visible={Boolean(moveGrouVisible)}
      close={() => setMoveGrouVisible(null)}
      deviceIds={moveGrouVisible || []}
      success={() => {
        setRecords([]);
        setMoveGrouVisible(null);
        ref.current.refresh();
      }}
    />

    <Restart
      visible={restarting}
      success={() => {
        setRestarting(null);
      }}
    />

    <DynamicForms
      open={formVisible}
      formData={formVisible}
      close={() => setFormVisible()}
      success={() => {
        setFormVisible();
        ref.current.refresh();
      }}
    />

    <NoteSave
      close={() => setNoteVisible({})}
      data={noteVisible}
      success={() => {
        setNoteVisible({});
        ref.current.refresh();
      }}
    />

    <Modal headTitle="设备版本管理" width={1500} ref={editionRef} component={Edition} />
  </>;
};

export default Equipment;
