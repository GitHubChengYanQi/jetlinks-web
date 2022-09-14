import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Select as AntSelect, message} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Restart from '@/pages/equipment/Equipment/Restart';
import Save from '@/pages/equipment/Equipment/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList, deviceStart, deviceStop} from '@/pages/equipment/Equipment/url';
import Select from '@/components/Select';
import Cascader from '@/components/Cascader';
import {deviceClassifyTree} from '@/pages/equipment/Grouping/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {useRequest} from '@/util/Request';
import {ActionButton, DangerButton} from '@/components/Button';
import {isArray} from '@/util/Tools';

const Equipment = () => {

  const ref = useRef();

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState();

  const [restarting, setRestarting] = useState();

  const [keys, setKeys] = useState([]);

  const {loading: stopLoading, run: stop} = useRequest(deviceStop, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('关闭成功！');
      ref.current.submit();
    },
    onError: () => message.error('关闭失败!')
  });

  const {loading: startLoading, run: start} = useRequest(deviceStart, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('启用成功！');
      ref.current.submit();
    },
    onError: () => message.error('启用失败!')
  });

  const columns = [
    {
      title: '设备状态',
      dataIndex: 'status',
      align: 'center',
      render: (value) => {
        const open = value === '1';
        return <Render>
          <span className={open ? 'green' : 'close'}>{open ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: '终端备注',
      dataIndex: 'remarks',
      align: 'center',
      render: (text) => {
        return <Render>
          <a className="blue" onClick={() => history.push('/monitor')}>{text}</a>
        </Render>;
      }
    },
    {
      title: '登记名称',
      dataIndex: 'name',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '设备分组',
      dataIndex: 'classifyName',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '设备类别',
      dataIndex: 'categoryName',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '设备型号',
      dataIndex: 'modelName',
      align: 'center',
      render: (text) => <Render width={120} text={text}/>
    },
    {
      title: '设备IP地址',
      dataIndex: '8',
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
      render: (text) => <Render width={120} text={text}/>
    },
    {
      title: '位置信息',
      dataIndex: '10',
      align: 'center',
      render: (text) => <Render width={200} text={text}/>
    },
    {
      title: '运行时间',
      dataIndex: 'runTime',
      align: 'center',
      render: (value) => <Render width={150}>
        {/* {moment.unix(moment(new Date()).diff(value)).from('dd 天')} */}
      </Render>
    },
    {
      title: '上线时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (value) => <Render width={150} text={value}/>
    },
    {
      title: '离线时间',
      dataIndex: 'offlineTime',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
    },
    {
      title: '质保时间',
      dataIndex: '12',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
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
            options={[{label: '全部', value: 'all'}, {label: '在线', value: '99'}, {label: '离线', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
      <FormItem label="终端备注" name="remarks" component={Input}/>
      <FormItem label="设备名称" name="name" component={Input}/>
      <FormItem label="设备分组" name="classifyId" api={deviceClassifyTree} component={Cascader}/>
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select}/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="位置信息" name="7" component={Input}/>
      <FormItem label="离线时间" name="time" component={DatePicker} RangePicker/>
    </>;
  };

  return <>
    <Table
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      onChange={setKeys}
      selectedRowKeys={keys}
      tableKey="device"
      loading={startLoading || stopLoading}
      ref={ref}
      searchButtons={[
        <Button type="primary" key={1}>移动分组</Button>,
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <Button type="primary">批量操作</Button>
        </Dropdown>,
        <Button type="primary" key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={deviceList}
      columns={columns}
      rowKey="deviceId"
      actionRender={(text, record) => {
        const open = record.status === '1';
        return <Space>
          <Button
            type="primary"
            onClick={() => setSaveVisible({...record, position: [record.longitude, record.latitude]})}
          >
            编辑
          </Button>
          <Warning content={`确定要${!open ? '重启' : '关闭'}重启设备么？`} onOk={() => {
            if (open) {
              stop({data: {deviceIds: [record.deviceId]}});
            } else {
              start({data: {deviceIds: [record.deviceId]}});
            }
          }}>
            {!open ? <ActionButton>重启</ActionButton> : <DangerButton>关闭</DangerButton>}
          </Warning>
        </Space>;
      }}
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
    />
    <Restart
      visible={restarting}
      success={() => {
        setRestarting(null);
      }}
    />
  </>;
};

export default Equipment;
