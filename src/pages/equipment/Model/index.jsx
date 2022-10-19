import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, Select, message, Button} from 'antd';
import cookie from 'js-cookie';
import {config} from 'ice';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Model/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {
  deviceModelDelete,
  deviceModelList,
  deviceModelStart,
  deviceModelStop
} from '@/pages/equipment/Model/url';
import DatePicker from '@/components/DatePicker';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import DownloadFile from '@/components/DownloadFile';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import Modal from '@/components/Modal';
import Firmware from '@/pages/equipment/Firmware';

const {baseURI} = config;

const formActionsPublic = createFormActions();

const Model = (
  {
    value,
  }
) => {
  const token = cookie.get('jetlink-token');

  const ref = useRef();
  const firmwareRef = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [records, setResords] = useState([]);

  const keys = records.map(item => item.modelId);

  const {loading: stopLoading, run: stop} = useRequest(deviceModelStop, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('关闭成功！');
      ref.current.refresh();
    },
    onError: () => message.error('关闭失败!')
  });

  const {loading: startLoading, run: start} = useRequest(deviceModelStart, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
    onError: () => message.error('启用失败!')
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(deviceModelDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
    onError: () => message.error('删除失败!')
  });


  const columns = [
    {title: '设备型号名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '所属设备类别',
      dataIndex: 'categoryResult',
      align: 'center',
      render: (categoryResult = {}) => <Render text={categoryResult.name}/>
    },
    {title: '设备数量', dataIndex: 'deviceNum', align: 'center', render: (text = '0') => <Render>{text || 0}</Render>},
    {
      title: '设备型号状态',
      dataIndex: 'status',
      align: 'center',
      render: (text = '0') => {
        const open = text !== '0';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    },
    {
      title: '通信协议',
      dataIndex: 'file',
      align: 'center',
      render: (fileId, record) => <Render>
        <DownloadFile fileId={fileId} fileName={record.fileName}/>
      </Render>
    },
    {
      title: '设备固件',
      align: 'center',
      render: (value, record) => <Render>
        <Button type="link" onClick={() => firmwareRef.current.open({
          categoryId: record.categoryId,
          modelId: record.modelId
        })}>管理设备固件</Button>
      </Render>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => start({data: {modelIds: keys}})}>批量启用</Warning>,
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => stop({data: {modelIds: keys}})}>批量停用</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => deleteRun({data: {modelIds: keys}})}>批量删除</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="创建时间" name="time" component={DatePicker} RangePicker/>
      <FormItem
        label="设备型号状态"
        name="status"
        component={({value, onChange}) => {
          return <Select
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'},]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
        select
      />
      <FormItem label="设备型号名称" name="name" component={Input}/>
    </>;
  };

  return <>
    <Table
      formActions={formActionsPublic}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return {...values, ...value};
      }}
      loading={startLoading || deleteLoading || stopLoading}
      ref={ref}
      searchButtons={[
        <PrimaryButton key={1} onClick={() => setSaveVisible({})}>新建设备型号</PrimaryButton>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <Button type="primary" key={3} onClick={() => {
          window.open(`${baseURI}/modelExcel/export?authorization=${token}&modelIds=${keys}`);
        }}>导出</Button>
      ]}
      api={deviceModelList}
      searchForm={searchForm}
      checkedRows={records}
      selectedRowKeys={keys}
      onChangeRows={setResords}
      columns={columns}
      rowKey="modelId"
      actionRender={(text, record) => {
        const open = record.status === '1';
        return <Space>
          <PrimaryButton onClick={() => {
            setSaveVisible(record);
          }}>编辑</PrimaryButton>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`} onOk={() => {
            if (open) {
              stop({data: {modelIds: [record.modelId]}});
            } else {
              start({data: {modelIds: [record.modelId]}});
            }
          }}>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning onOk={() => deleteRun({data: {modelIds: [record.modelId]}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <Save
      categoryId={value?.categoryId}
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
      }}/>

    <Modal headTitle="设备固件管理" width={1200} ref={firmwareRef} component={Firmware}/>
  </>;
};

export default Model;
