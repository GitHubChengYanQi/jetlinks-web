import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Select as AntSelect, Badge, message} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Firmware/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {firmwareDelete, firmwareList, firmwareStart, firmwareStop} from '@/pages/equipment/Firmware/url';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import {useRequest} from '@/util/Request';
import {isArray, isObject} from '@/util/Tools';
import Note from '@/components/Note';

const formActionsPublic = createFormActions();

const Firmware = ({value = {}}) => {

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();


  const [keys, setKeys] = useState([]);

  const {loading: stopLoading, run: stop} = useRequest(firmwareStop, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('关闭成功！');
      ref.current.refresh();
    },
  });

  const {loading: startLoading, run: start} = useRequest(firmwareStart, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(firmwareDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });


  const columns = [
    {
      title: '设备类别',
      dataIndex: 'modelResult',
      align: 'center',
      render: (value = {}) => <Render text={value.categoryResult && value.categoryResult.name}/>
    },
    {title: '设备型号', dataIndex: 'modelResult', align: 'center', render: (value = {}) => <Render text={value.name}/>},
    {title: '固件名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件版本', dataIndex: 'version', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '固件状态', dataIndex: 'status', align: 'center',
      render: (text = '0') => {
        const open = text !== '0';
        return <Render>
          <Badge color={open ? 'green' : 'red'} text={open ? '启用' : '停用'}/>
        </Render>;
      }
    },
    {title: '上传时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '描述', dataIndex: 'remarks', align: 'center', render: (text) => <Render text={<Note value={text}/>}/>
    },
  ];


  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => start({data: {firmwarIds: keys}})}>批量启用</Warning>,
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => stop({data: {firmwarIds: keys}})}>批量停用</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => deleteRun({data: {firmwarIds: keys}})}>批量删除</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="上传时间" name="time" component={DatePicker} RangePicker/>
      <FormItem
        label="固件状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
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
      onChange={setKeys}
      selectedRowKeys={keys}
      loading={startLoading || deleteLoading || stopLoading}
      ref={ref}
      searchButtons={[
        <PrimaryButton key={1} onClick={() => setSaveVisible({})}>新建固件</PrimaryButton>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3} onClick={() => {
          window.open(`${baseURI}/FirmwareExcel/export?authorization=${token}&firmWareIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={firmwareList}
      columns={columns}
      rowKey="firmwarId"
      actionRender={(text, record) => {
        const open = record.status === '1';
        return <Space>
          <PrimaryButton type="link" onClick={() => {
            setSaveVisible({...record, categoryId: isObject(record.modelResult).categoryId});
          }}>编辑</PrimaryButton>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`} onOk={() => {
            if (open) {
              stop({data: {firmwarIds: [record.firmwarId]}});
            } else {
              start({data: {firmwarIds: [record.firmwarId]}});
            }
          }}>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning onOk={() => deleteRun({data: {firmwarIds: [record.firmwarId]}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <Save
      categoryId={value?.categoryId}
      modelId={value?.modelId}
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
  </>;
};
export default Firmware;
