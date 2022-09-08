import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Select as AntSelect} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Firmware/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {firmwareList} from '@/pages/equipment/Firmware/url';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';

const Firmware = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const columns = [
    {
      title: '设备类别',
      dataIndex: 'modelResult',
      align: 'center',
      render: (value) => <Render text={value.categoryResult && value.categoryResult.name}/>
    },
    {title: '设备型号', dataIndex: 'modelResult', align: 'center', render: (value = {}) => <Render text={value.name}/>},
    {title: '固件名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件版本', dataIndex: 'version', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '固件状态', dataIndex: 'status', align: 'center',
      render: (text = '0') => {
        const open = text !== '0';
        return <Render><Button type="link" danger={!open}>{open ? '启用' : '禁用'}</Button></Render>;
      }
    },
    {title: '上传时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        const stop = record.status === '0';
        return <Space>
          <Button ghost type="primary" onClick={() => {
            setSaveVisible(record);
          }}>编辑</Button>
          <Warning content="您确定启用么？" onOk={() => {
            if (stop) {

            } else {

            }
          }}>
            <Button ghost danger={!stop} type="primary">{!stop ? '停用' : '启用'}</Button>
          </Warning>
          <Warning>
            <Button danger>删除</Button>
          </Warning>
        </Space>;
      }
    },
  ];


  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？">批量启用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？">批量停用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '3',
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="上传时间" name="createTime" component={DatePicker} RangePicker />
      <FormItem
        label="固件状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '99'}, {label: '禁用', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select}/>
    </>;
  };

  return <>
    <Table
      ref={ref}
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})}>新建固件</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={firmwareList}
      columns={columns}
      rowKey="firmwarId"
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
  </>;
};
export default Firmware;
